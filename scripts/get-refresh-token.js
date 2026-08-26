/* eslint-env node */
// Script de uso único: genera el refresh token OAuth para que la Netlify
// Function pueda enviar correos como webmaster@ingeverasociados.com.
//
// NO se ejecuta en producción. NO se despliega como Netlify Function.
// Se corre localmente:
//
//   1) Asegúrate de tener GOOGLE_OAUTH_CLIENT_ID y GOOGLE_OAUTH_CLIENT_SECRET
//      del OAuth Client "Web application" creado en Google Cloud.
//      Puedes pasarlos como variables de entorno o escribirlos abajo.
//   2) Ejecuta:  node scripts/get-refresh-token.js
//   3) Se abrirá el navegador. Inicia sesión como webmaster@ingeverasociados.com
//      y acepta el scope `https://www.googleapis.com/auth/gmail.send`.
//   4) El script imprime en consola el refresh token. Cópialo a la variable
//      de entorno GOOGLE_OAUTH_REFRESH_TOKEN en Netlify.

import { google } from "googleapis";
import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET || "";
const REDIRECT_PORT = 53682;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "\nFaltan credenciales.\n" +
      "Define las variables de entorno GOOGLE_OAUTH_CLIENT_ID y GOOGLE_OAUTH_CLIENT_SECRET\n" +
      "o escríbelas directamente en el script.\n" +
      "Puedes obtenerlas en https://console.cloud.google.com/apis/credentials\n",
  );
  process.exit(1);
}

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // fuerza a Google a devolver refresh_token
  scope: ["https://www.googleapis.com/auth/gmail.send"],
});

console.log("\nAbriendo navegador para autorizar la app...");
console.log("Si no se abre, pega esta URL en tu navegador:\n");
console.log(authUrl);
console.log();

// Abrir navegador (best-effort en Windows, macOS y Linux)
try {
  const startCmd =
    process.platform === "win32"
      ? "start"
      : process.platform === "darwin"
        ? "open"
        : "xdg-open";
  exec(`${startCmd} "" "${authUrl}"`);
} catch {
  /* ignore */
}

// Servidor HTTP local que recibe el ?code=...
const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
      const code = url.searchParams.get("code");
      const error = url.searchParams.get("error");
      if (error) {
        res.end(`<h1>Error</h1><p>${error}</p>`);
        server.close();
        reject(new Error(error));
        return;
      }
      if (code) {
        res.end(
          "<h1>Listo</h1><p>Puedes cerrar esta pestaña y volver a la consola.</p>",
        );
        server.close();
        resolve(code);
      } else {
        res.end("<h1>Esperando autorización...</h1>");
      }
    } catch (err) {
      server.close();
      reject(err);
    }
  });
  server.listen(REDIRECT_PORT, () => {
    console.log(`Esperando autorización en ${REDIRECT_URI} ...`);
  });
});

const { tokens } = await oauth2.getToken(code);

console.log("\n--- TOKENS RECIBIDOS ---\n");
console.log("access_token:", tokens.access_token);
console.log("\nrefresh_token (ESTE ES EL QUE NECESITAS):\n");
console.log("  " + (tokens.refresh_token || "(no devuelto)"));
console.log(
  "\nCopia el refresh_token a la variable GOOGLE_OAUTH_REFRESH_TOKEN en Netlify.",
);
console.log(
  "Si el refresh_token viene vacío, revoca el acceso previo en\n" +
    "  https://myaccount.google.com/permissions\n" +
    "y vuelve a ejecutar este script.\n",
);
