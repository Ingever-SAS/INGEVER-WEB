/* eslint-env node */
// Plantillas HTML de los correos corporativos de Ingever Asociados S.A.S.
//
// Estas plantillas están construidas con tablas anidadas (table -> tr -> td)
// para garantizar la máxima compatibilidad con clientes de correo
// (Gmail, Outlook, Apple Mail, Yahoo, móviles).
//
// - No se usa flexbox ni grid (mal soporte en Outlook).
// - No se usa CSS moderno como :root variables, transforms, animations.
// - Todo el estilo se aplica inline en cada elemento para sobrevivir al
//   "saneado" que aplican los clientes de correo.
// - Se usa una versión "negra" del logo (logo2.png) sobre fondo claro para
//   máxima legibilidad en correos HTML.
//
// Estructura visual:
//
//   [ Banda dorada superior ]
//   [ LOGO  +  Ingever Asociados S.A.S. ]
//   [ Etiqueta de tipo de solicitud (dorado) ]
//   [ Título principal (navy) ]
//   [ Texto introductorio ]
//   [ Bloque: INFORMACIÓN DEL SOLICITANTE ]
//   [ Bloque: SERVICIO SOLICITADO / DATOS LABORALES ]
//   [ Bloque: DESCRIPCIÓN / PRESENTACIÓN ]
//   [ Bloque: ARCHIVO ADJUNTO / HOJA DE VIDA ]
//   [ Botón: RESPONDER AL SOLICITANTE ]
//   [ Footer corporativo ]

const BRAND = {
  navy: "#0B1F4A",
  blue: "#15589D",
  blueLight: "#5A98D4",
  gold: "#F4B400",
  mist: "#F6F8FC",
  white: "#FFFFFF",
  text: "#1F2A44",
  muted: "#5C6580",
  line: "#E4E8F0",
  // Logo blanco para usar sobre el fondo navy de la cabecera.
  logoOnDark:
    "https://ingeverasociados.com/images/logo-horizontal-blanco.png",
  // Logo a color para usar en el footer blanco.
  logoOnLight:
    "https://ingeverasociados.com/images/logo-horizontal.png",
  siteUrl: "https://ingeverasociados.com",
  companyName: "Ingever Asociados S.A.S.",
  tagline: "Especialistas en puentes grúa y equipos de izaje.",
};

// Helpers ---------------------------------------------------------------

function escapeHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatFileSize(bytes) {
  if (!bytes || Number.isNaN(Number(bytes))) return "Adjunto recibido";
  const size = Number(bytes);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function row(label, value) {
  return `
    <tr>
      <td width="170" valign="top" style="padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">
        ${escapeHtml(label)}
      </td>
      <td valign="top" style="padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${BRAND.text};line-height:22px;word-break:break-word;">
        ${value || '<span style="color:#9aa3b8;">—</span>'}
      </td>
    </tr>
  `;
}

function section(title, content) {
  return `
    <tr>
      <td style="padding:28px 0 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="border-top:1px solid ${BRAND.line};padding-top:24px;">
              <p style="margin:0 0 14px 0;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.18em;color:${BRAND.gold};text-transform:uppercase;">
                ${escapeHtml(title)}
              </p>
              ${content}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function dataTable(rows) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      ${rows.join("")}
    </table>
  `;
}

function descriptionBlock(text) {
  if (!text) {
    return '<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#9aa3b8;font-style:italic;">Sin información adicional.</p>';
  }
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.mist};border-radius:10px;">
      <tr>
        <td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${BRAND.text};line-height:24px;white-space:pre-wrap;word-break:break-word;">
          ${escapeHtml(text)}
        </td>
      </tr>
    </table>
  `;
}

function attachmentBlock(file) {
  if (!file || !file.name) {
    return `
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#9aa3b8;font-style:italic;">
        No se adjuntó ningún archivo.
      </p>
    `;
  }
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.mist};border:1px solid ${BRAND.line};border-radius:10px;">
      <tr>
        <td width="48" valign="top" style="padding:16px 0 16px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:40px;height:40px;background-color:${BRAND.navy};border-radius:8px;">
            <tr>
              <td align="center" valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:18px;color:${BRAND.gold};font-weight:700;">
                📎
              </td>
            </tr>
          </table>
        </td>
        <td valign="middle" style="padding:14px 18px 14px 14px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${BRAND.text};font-weight:700;line-height:20px;">
            ${escapeHtml(file.name)}
          </p>
          <p style="margin:4px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};line-height:18px;">
            ${escapeHtml(file.type || "Archivo adjunto")} · ${escapeHtml(formatFileSize(file.size))}
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};line-height:18px;">
      El archivo también queda disponible en el panel de Netlify Forms del sitio.
    </p>
  `;
}

function replyButton(replyTo) {
  const safeEmail = escapeHtml(replyTo || "");
  const href = `mailto:${safeEmail}?subject=${encodeURIComponent(
    "Re: Tu solicitud a Ingever Asociados S.A.S.",
  )}`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;">
      <tr>
        <td align="center" bgcolor="${BRAND.navy}" style="border-radius:10px;">
          <a href="${href}"
             target="_blank"
             style="display:inline-block;padding:14px 28px;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.06em;color:${BRAND.gold};text-decoration:none;text-transform:uppercase;">
            Responder al solicitante
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};line-height:18px;">
      Al responder, el mensaje llegará directamente a
      <span style="color:${BRAND.text};font-weight:700;">${safeEmail}</span>.
    </p>
  `;
}

function layout({ eyebrow, title, intro, body, replyTo }) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#EEF1F7;-webkit-text-size-adjust:100%;">
  <!-- Preheader (oculto) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;color:#EEF1F7;line-height:1px;">
    ${escapeHtml(intro)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#EEF1F7" style="background-color:#EEF1F7;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- Contenedor principal -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background-color:${BRAND.white};border-radius:14px;overflow:hidden;border:1px solid ${BRAND.line};">

          <!-- Banda dorada superior -->
          <tr>
            <td bgcolor="${BRAND.gold}" style="height:6px;line-height:6px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Cabecera con logo -->
          <tr>
            <td bgcolor="${BRAND.navy}" style="background-color:${BRAND.navy};padding:32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="middle" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.32em;color:${BRAND.gold};font-weight:700;text-transform:uppercase;">
                      Ingever Asociados
                    </p>
                    <p style="margin:0;font-size:20px;font-weight:700;color:${BRAND.white};line-height:26px;">
                      Sitio web corporativo
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <img src="${BRAND.logoOnLight}" alt="Ingever Asociados S.A.S." width="120" height="40" style="display:block;border:0;outline:none;text-decoration:none;background:transparent;filter:brightness(0) invert(1);" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cuerpo del mensaje -->
          <tr>
            <td style="padding:36px 36px 8px 36px;">

              <p style="margin:0 0 12px 0;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.24em;color:${BRAND.gold};text-transform:uppercase;">
                ${escapeHtml(eyebrow)}
              </p>

              <h1 style="margin:0 0 16px 0;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;font-size:26px;font-weight:700;color:${BRAND.navy};line-height:32px;">
                ${escapeHtml(title)}
              </h1>

              <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${BRAND.muted};line-height:24px;">
                ${escapeHtml(intro)}
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${body}
              </table>

            </td>
          </tr>

          <!-- Botón de respuesta -->
          <tr>
            <td style="padding:16px 36px 36px 36px;">
              ${replyTo ? replyButton(replyTo) : ""}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="${BRAND.mist}" style="background-color:${BRAND.mist};padding:28px 36px;border-top:1px solid ${BRAND.line};">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="font-family:Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 4px 0;font-size:14px;font-weight:700;color:${BRAND.navy};">
                      ${escapeHtml(BRAND.companyName)}
                    </p>
                    <p style="margin:0 0 12px 0;font-size:12px;color:${BRAND.muted};line-height:18px;">
                      ${escapeHtml(BRAND.tagline)}
                    </p>
                    <p style="margin:0;font-size:12px;color:${BRAND.muted};line-height:18px;">
                      Sitio web:
                      <a href="${BRAND.siteUrl}" style="color:${BRAND.blue};text-decoration:none;font-weight:700;">
                        ${BRAND.siteUrl.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Pie fuera del contenedor -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;">
          <tr>
            <td align="center" style="padding:18px 12px 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${BRAND.muted};line-height:16px;">
              Este mensaje fue generado automáticamente al recibir una solicitud desde el sitio web de Ingever Asociados.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Correo: nueva cotización ---------------------------------------------

export function cotizacionEmailTemplate({ data, file, submittedAt }) {
  const subjectTitle = "Nueva solicitud de cotización";
  const body = [
    section(
      "Información del solicitante",
      dataTable([
        row("Nombre", escapeHtml(data.nombre)),
        row("Empresa", escapeHtml(data.empresa)),
        row("Correo", `<a href="mailto:${escapeHtml(data.correo)}" style="color:${BRAND.blue};text-decoration:none;font-weight:700;">${escapeHtml(data.correo)}</a>`),
        row("Teléfono", data.telefono
          ? `<a href="tel:${escapeHtml(String(data.telefono).replace(/[^+\d]/g, ""))}" style="color:${BRAND.text};text-decoration:none;">${escapeHtml(data.telefono)}</a>`
          : ""),
        row("Recibido", escapeHtml(submittedAt)),
      ]),
    ),
    section(
      "Servicio solicitado",
      dataTable([row("Tipo de servicio", escapeHtml(data.servicio))]),
    ),
    section("Descripción del proyecto", descriptionBlock(data.descripcion)),
    section("Archivo adjunto", attachmentBlock(file)),
  ].join("");

  return {
    subject: `Nueva cotización · ${data.nombre || "Sitio web"}${data.empresa ? ` (${data.empresa})` : ""}`,
    eyebrow: "Nueva solicitud de cotización",
    title: subjectTitle,
    intro:
      "Se ha recibido una nueva solicitud desde el formulario de cotización del sitio web de Ingever Asociados S.A.S. A continuación encontrarás los datos enviados por el cliente.",
    body,
    replyTo: data.correo,
  };
}

// Correo: nueva postulación laboral ------------------------------------

export function postulacionEmailTemplate({ data, file, submittedAt }) {
  const body = [
    section(
      "Información del candidato",
      dataTable([
        row("Nombre", escapeHtml(data.nombre)),
        row("Cargo al que aspira", escapeHtml(data.cargo)),
        row("Correo", `<a href="mailto:${escapeHtml(data.correo)}" style="color:${BRAND.blue};text-decoration:none;font-weight:700;">${escapeHtml(data.correo)}</a>`),
        row("Teléfono", data.telefono
          ? `<a href="tel:${escapeHtml(String(data.telefono).replace(/[^+\d]/g, ""))}" style="color:${BRAND.text};text-decoration:none;">${escapeHtml(data.telefono)}</a>`
          : ""),
        row("Área de interés", escapeHtml(data.area)),
        row("Recibido", escapeHtml(submittedAt)),
      ]),
    ),
    section("Presentación", descriptionBlock(data.presentacion)),
    section("Hoja de vida", attachmentBlock(file)),
  ].join("");

  return {
    subject: `Nueva postulación · ${data.nombre || "Sitio web"}${data.cargo ? ` – ${data.cargo}` : ""}`,
    eyebrow: "Nueva postulación laboral",
    title: "Nueva postulación laboral",
    intro:
      "Se ha recibido una nueva postulación desde el formulario de empleo del sitio web de Ingever Asociados S.A.S. A continuación encontrarás los datos y la hoja de vida enviada por el candidato.",
    body,
    replyTo: data.correo,
  };
}

// Render final: une layout + contenido ----------------------------------

export function renderEmail(template) {
  return layout(template);
}
