/* eslint-env node */
// Netlify Function: submit-form
//
// Recibe el FormData enviado por submitNetlifyForm (src/utils/netlifyForms.js).
//
// 1. Reenvía el form a Netlify Forms en multipart/form-data para que el
//    envío siga apareciendo en el panel de Netlify (mantiene la URL firmada
//    del archivo adjunto, las validaciones de honeypot, etc.).
// 2. Construye y envía un correo HTML corporativo con los mismos datos y
//    un botón "Responder al solicitante" que usa Reply-To con el correo
//    del usuario.
//
// Formularios soportados:
//   - cotizacion
//   - postulacion-laboral
//
// Variables de entorno requeridas:
//   COTIZACIONES_EMAIL      - destino para cotizaciones
//   EMPLEO_EMAIL            - destino para postulaciones
//   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS - ver lib/sendMail.js

import {
  cotizacionEmailTemplate,
  postulacionEmailTemplate,
  renderEmail,
} from "./lib/emailTemplates.js";
import { sendHtmlEmail } from "./lib/sendMail.js";

// Config ----------------------------------------------------------------

const SUPPORTED_FORMS = new Set(["cotizacion", "postulacion-laboral"]);

const FORM_CONFIG = {
  cotizacion: {
    destinationEnv: "COTIZACIONES_EMAIL",
    fileField: "archivo",
    buildEmail: cotizacionEmailTemplate,
    fields: [
      "nombre",
      "empresa",
      "correo",
      "telefono",
      "servicio",
      "descripcion",
    ],
  },
  "postulacion-laboral": {
    destinationEnv: "EMPLEO_EMAIL",
    fileField: "hoja-de-vida",
    buildEmail: postulacionEmailTemplate,
    fields: [
      "nombre",
      "cargo",
      "correo",
      "telefono",
      "area",
      "presentacion",
    ],
  },
};

// Helpers ---------------------------------------------------------------

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function getEnv(name) {
  const value = process.env[name];
  return value && String(value).trim() !== "" ? String(value).trim() : null;
}

function parseMultipartAll(event) {
  // Parsea todos los campos (texto + archivo) del body multipart y devuelve
  // { fields: { nombre: "..." }, file: { name, type, size } }.
  const contentType =
    event.headers["content-type"] || event.headers["Content-Type"] || "";
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundaryMatch) return { fields: {}, file: null };
  const boundary = `--${boundaryMatch[1] || boundaryMatch[2]}`;
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64")
    : Buffer.from(String(event.body || ""), "binary");

  const fields = {};
  let file = null;
  const boundaryBuf = Buffer.from(boundary);

  let start = 0;
  while (true) {
    const end = raw.indexOf(boundaryBuf, start);
    if (end === -1) break;
    const part = raw.slice(start, end);
    start = end + boundaryBuf.length;

    // Separa headers del body del part
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;
    const headerText = part.slice(0, headerEnd).toString("utf8");
    const bodyBuf = part.slice(headerEnd + 4, part.length - 2); // quita CRLF final

    const nameMatch = headerText.match(/name="([^"]+)"/i);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    const filenameMatch = headerText.match(/filename="([^"]*)"/i);
    const typeMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);

    if (filenameMatch && filenameMatch[1] !== "") {
      file = {
        fieldName: name,
        name: filenameMatch[1],
        type: typeMatch ? typeMatch[1].trim() : "application/octet-stream",
        size: bodyBuf.length,
        content: bodyBuf,
      };
    } else {
      fields[name] = bodyBuf.toString("utf8").trim();
    }
  }

  return { fields, file };
}

// Reenvío a Netlify Forms ---------------------------------------------

async function forwardToNetlify({ formName, fields, file }) {
  // Reconstruye un multipart/form-data y lo envía al endpoint de Netlify
  // Forms. Usamos la URL estándar `/?form-name=...` que es la que Netlify
  // espera para registrar envíos.
  const boundary = `----IngeverBoundary${Date.now().toString(36)}`;
  const chunks = [];

  const append = (name, value) => {
    chunks.push(Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${name}"\r\n\r\n` +
      `${value}\r\n`,
      "utf8",
    ));
  };

  for (const [key, value] of Object.entries(fields)) {
    append(key, value ?? "");
  }
  append("form-name", formName);

  if (file && file.content && file.content.length > 0) {
    chunks.push(Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${file.fieldName}"; filename="${file.name}"\r\n` +
      `Content-Type: ${file.type}\r\n\r\n`,
      "utf8",
    ));
    chunks.push(file.content);
    chunks.push(Buffer.from("\r\n", "utf8"));
  }

  chunks.push(Buffer.from(`--${boundary}--\r\n`, "utf8"));
  const body = Buffer.concat(chunks);

  const url = `${netlifyFormsOrigin()}/?form-name=${encodeURIComponent(formName)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${boundary}`,
      "Accept": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Netlify Forms rechazó el envío (${response.status}): ${text.slice(0, 200)}`,
    );
  }
}

function netlifyFormsOrigin() {
  // El sitio público se sirve en el mismo dominio que Netlify Forms espera.
  // Si el deploy se hace en un subdominio *.netlify.app, este es el origen
  // correcto. Para dominios personalizados, Netlify sigue aceptando el
  // endpoint /?form-name=... contra el dominio público del sitio.
  return (
    getEnv("SITE_ORIGIN") ||
    `https://${getEnv("SITE_NAME") || "ingeverasociados.com"}`
  );
}

// Handler principal -----------------------------------------------------

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Método no permitido." });
  }

  let fields = {};
let file = null;

const contentType =
  event.headers["content-type"] ||
  event.headers["Content-Type"] ||
  "";

if (contentType.includes("application/json")) {
  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "{}";

    fields = JSON.parse(rawBody);
  } catch (error) {
    console.error("[submit-form] JSON inválido:", error.message);

    return jsonResponse(400, {
      ok: false,
      error: "Datos del formulario inválidos.",
    });
  }
} else {
  const parsed = parseMultipartAll(event);
  fields = parsed.fields;
  file = parsed.file;
}

const formName = fields["form-name"];

  if (!formName || !SUPPORTED_FORMS.has(formName)) {
    return jsonResponse(400, {
      ok: false,
      error: "Formulario no soportado.",
    });
  }

  const config = FORM_CONFIG[formName];

  // 1) Honeypot: si está relleno, es un bot. Aceptamos silenciosamente.
  if (fields["bot-field"]) {
    return jsonResponse(200, { ok: true, skipped: true });
  }

  // 2) Validaciones mínimas
  const data = {};
  for (const key of config.fields) {
    data[key] = fields[key] || "";
  }
  if (!data.nombre || !data.correo) {
    return jsonResponse(400, {
      ok: false,
      error: "Faltan datos obligatorios.",
    });
  }
  if (file && file.fieldName !== config.fileField) {
    return jsonResponse(400, {
      ok: false,
      error: "Campo de archivo no corresponde al formulario.",
    });
  }

  // 3) Construir email HTML
  const submittedAt = new Date().toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "long",
    timeStyle: "short",
  });

  const tpl = config.buildEmail({
    data,
    file: file
      ? { name: file.name, type: file.type, size: file.size }
      : null,
    submittedAt,
  });

  const html = renderEmail(tpl);
  const destination = getEnv(config.destinationEnv);

  // 4) Enviar email HTML (es lo crítico para el cliente)
  let emailError = null;
  if (destination) {
    try {
      await sendHtmlEmail({
        to: destination,
        subject: tpl.subject,
        html,
        replyTo: tpl.replyTo,
      });
    } catch (err) {
      emailError = err;
      // No abortamos: seguimos intentando registrar en Netlify Forms.
      console.error("[submit-form] Error enviando email HTML:", err.message);
    }
  } else {
    console.warn(
      `[submit-form] Variable ${config.destinationEnv} no configurada. No se envió email HTML.`,
    );
  }

  // 5) Netlify Forms
//
// Para postulaciones laborales, el formulario completo
// (incluyendo la hoja de vida) ya fue enviado directamente
// desde el navegador a Netlify Forms.
//
// Para cotizaciones mantenemos el flujo anterior,
// porque pueden seguir utilizando archivos desde la Function.

if (formName === "cotizacion") {
  try {
    await forwardToNetlify({ formName, fields, file });
  } catch (err) {
    console.error(
      "[submit-form] Error reenviando a Netlify Forms:",
      err.message,
    );

    if (emailError) {
      return jsonResponse(502, {
        ok: false,
        error:
          "No fue posible registrar la solicitud. Inténtalo de nuevo en unos momentos.",
      });
    }
  }
}

  if (emailError) {
    return jsonResponse(502, {
      ok: false,
      error:
        "No fue posible enviar la notificación. Inténtalo de nuevo en unos momentos.",
    });
  }

  return jsonResponse(200, { ok: true });
}
