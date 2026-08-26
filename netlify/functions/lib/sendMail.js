/* eslint-env node */
// Envío de correo vía Gmail API + OAuth 2.0.
//
// NO usa SMTP ni App Password. La Netlify Function se autentica con un
// refresh token de larga duración y, en cada invocación, obtiene (o
// reutiliza) un access token de corta duración para llamar a
// `gmail.users.messages.send`.
//
// Scope utilizado (mínimo):
//   https://www.googleapis.com/auth/gmail.send
//
// Variables de entorno requeridas (configurar en Netlify → Environment
// variables):
//   GOOGLE_OAUTH_CLIENT_ID      - del OAuth Client "Web application" en Google Cloud
//   GOOGLE_OAUTH_CLIENT_SECRET  - idem
//   GOOGLE_OAUTH_REFRESH_TOKEN  - generado UNA sola vez (ver scripts/get-refresh-token.js)
//   MAIL_FROM_ADDRESS           - p. ej. webmaster@ingeverasociados.com
//   MAIL_FROM_NAME              - nombre visible (opcional)
//
// Las direcciones de destino (COTIZACIONES_EMAIL, EMPLEO_EMAIL) las recibe
// la función que invoca a sendMail; este módulo solo arma el MIME y envía.

import { google } from "googleapis";

const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// Helpers --------------------------------------------------------------

function getEnv(name) {
  const value = process.env[name];
  if (!value || String(value).trim() === "") return null;
  return String(value).trim();
}

// Construcción de MIME -------------------------------------------------
//
// Gmail API espera un mensaje en base64url (RFC 4648 §5). Construimos el
// mensaje a mano para tener control total sobre cabeceras (From, To,
// Subject, Reply-To, MIME-Version, Content-Type, charset) y poder añadir
// una versión texto plano alternativa para clientes que no soportan HTML.

function buildRawMime({ from, fromName, to, subject, html, replyTo, text }) {
  const displayFrom = fromName
    ? `=?UTF-8?B?${Buffer.from(fromName, "utf8").toString("base64")}?= <${from}>`
    : from;

  const headers = [
    `From: ${displayFrom}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`,
    `MIME-Version: 1.0`,
  ];
  if (replyTo) headers.push(`Reply-To: ${replyTo}`);

  // multipart/alternative: text/plain + text/html
  const boundary = `mixed_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  headers.push(`Content-Type: multipart/alternative; boundary="${boundary}"`);

  const plainPart =
    `--${boundary}\r\n` +
    `Content-Type: text/plain; charset="UTF-8"\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    `${Buffer.from(text, "utf8").toString("base64")}\r\n`;

  const htmlPart =
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    `${Buffer.from(html, "utf8").toString("base64")}\r\n`;

  const closing = `--${boundary}--\r\n`;

  return headers.join("\r\n") + "\r\n\r\n" + plainPart + htmlPart + closing;
}

function encodeBase64Url(raw) {
  // Gmail requiere base64url SIN padding.
  return Buffer.from(raw, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

// Auth + envío --------------------------------------------------------

let cachedAuth = null;        // { client, expiryMs }
let cachedAccessToken = null; // string | null

function getOAuthClient() {
  if (cachedAuth) return cachedAuth;

  const clientId = getEnv("GOOGLE_OAUTH_CLIENT_ID");
  const clientSecret = getEnv("GOOGLE_OAUTH_CLIENT_SECRET");
  const refreshToken = getEnv("GOOGLE_OAUTH_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Faltan credenciales OAuth de Google (GOOGLE_OAUTH_CLIENT_ID, " +
        "GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN). " +
        "Configúralas en Netlify → Environment variables. " +
        "Para generarlas la primera vez, usa scripts/get-refresh-token.js.",
    );
  }

  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials({ refresh_token: refreshToken });
  cachedAuth = { client };
  return cachedAuth;
}

async function getAccessToken() {
  const { client } = getOAuthClient();

  // Si la librería ya tiene un access token vigente, lo reutiliza.
  const existing = client.credentials?.access_token;
  const expiry = client.credentials?.expiry_date; // ms epoch
  const now = Date.now();
  if (existing && expiry && expiry > now + 30_000) {
    return existing;
  }

  // Si no, refresca con el refresh token.
  const { credentials } = await client.refreshAccessToken();
  cachedAccessToken = credentials.access_token;
  return credentials.access_token;
}

export async function sendHtmlEmail({
  to,
  subject,
  html,
  replyTo,
  fromName,
  fromAddress,
}) {
  const fromAddressResolved =
    fromAddress || getEnv("MAIL_FROM_ADDRESS") || "webmaster@ingeverasociados.com";
  const displayName =
    fromName || getEnv("MAIL_FROM_NAME") || "Ingever Asociados S.A.S.";

  // Versión texto plano de fallback (para clientes sin HTML).
  const text =
    "Has recibido una nueva solicitud desde el sitio web de " +
    "Ingever Asociados S.A.S. Por favor, visualiza este mensaje en un " +
    "cliente que soporte HTML.";

  const raw = buildRawMime({
    from: fromAddressResolved,
    fromName: displayName,
    to,
    subject,
    html,
    replyTo,
    text,
  });

  const encoded = encodeBase64Url(raw);

  // Aseguramos que el access token esté disponible antes de instanciar gmail.
  await getAccessToken();

  const gmail = google.gmail({ version: "v1", auth: getOAuthClient().client });

  const res = await gmail.users.messages.send({
    userId: "me", // "me" = la cuenta del refresh token (webmaster@ingeverasociados.com)
    requestBody: { raw: encoded },
  });

  return res.data;
}
