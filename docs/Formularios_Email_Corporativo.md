# Formularios y notificaciones por correo

Documentación del sistema de formularios de **Ingever Asociados S.A.S.**
y de cómo configurar el envío de notificaciones HTML corporativas.

---

## Resumen

El sitio web tiene dos formularios que llegan al equipo de Ingever:

1. **Cotización** (`cotizacion`) — formulario de `/contacto`.
2. **Postulación laboral** (`postulacion-laboral`) — formulario de
   `/trabaja-con-nosotros`.

Ambos formularios están construidos como **Netlify Forms** estándar
(`data-netlify="true"`, `data-netlify-honeypot="bot-field"`,
`enctype="multipart/form-data"`) y se siguen registrando en el panel
de Netlify Forms.

Para que las **notificaciones por correo** lleguen con un aspecto
corporativo profesional (en HTML, con la marca de Ingever y un botón
para responder directamente al cliente o candidato), se añadió una
**Netlify Function** intermedia (`netlify/functions/submit-form.js`).

```
[ Formulario en el navegador ]
            │  FormData (multipart/form-data)
            ▼
[ /.netlify/functions/submit-form ]
            │
            ├──► [ Netlify Forms ]   (panel + URL firmada del adjunto)
            │
            └──► [ Gmail API + OAuth 2.0 ]   (email HTML corporativo)
                   scope: https://www.googleapis.com/auth/gmail.send
```

La función reenvía el form a Netlify Forms (mantiene el historial y el
adjunto) **y** envía un email HTML corporativo desde
`webmaster@ingeverasociados.com` usando **Gmail API con OAuth 2.0**
(sin SMTP, sin App Password, sin contraseña).

---

## Archivos nuevos / modificados

| Archivo | Tipo | Descripción |
| --- | --- | --- |
| `netlify/functions/submit-form.js` | Nuevo | Netlify Function principal. |
| `netlify/functions/lib/emailTemplates.js` | Nuevo | Plantillas HTML para los dos correos. |
| `netlify/functions/lib/sendMail.js` | Nuevo | Wrapper sobre Gmail API (OAuth 2.0). |
| `scripts/get-refresh-token.js` | Nuevo | Script local para generar el refresh token una sola vez. |
| `netlify.toml` | Nuevo | Configuración de build y functions. |
| `.env.example` | Nuevo | Plantilla de variables de entorno. |
| `src/utils/netlifyForms.js` | Modificado | Apunta a la Netlify Function. |
| `package.json` | Modificado | Dependencia `googleapis` (antes `nodemailer`). |

**No se modificaron** los componentes de React (`ContactPage`,
`JoinTeamPage`, `index.html`, etc.). El sitio conserva exactamente su
diseño, animaciones y comportamiento actual.

---

## Configuración en Google Cloud (una sola vez)

> Toda esta sección se hace con un usuario administrador de
> `ingeverasociados.com` en Google Workspace.

### 1. Crear (o seleccionar) un proyecto

- https://console.cloud.google.com/.
- Crear un proyecto nuevo, por ejemplo `Ingever Web Forms`.
- Vinculado a la organización Workspace de Ingever.

### 2. Habilitar Gmail API

- **APIs & Services → Library → buscar `Gmail API` → Enable.**

### 3. Pantalla de consentimiento (OAuth consent screen)

- Tipo: **Internal** (solo usuarios del dominio pueden autorizar;
  no requiere verificación de Google).
- Nombre: `Ingever Web Forms`.
- Correo de soporte: el de TI de Ingever.
- **Scopes**: agregar **únicamente**
  `https://www.googleapis.com/auth/gmail.send`.

### 4. Crear OAuth Client ID

- **APIs & Services → Credentials → Create credentials → OAuth client ID.**
- Application type: **Web application**.
- Name: `Ingever Web Forms Function`.
- Authorized redirect URI: `http://localhost:53682`
  (se usa solo una vez, cuando se genera el refresh token con el script).
- Guardar. Esto produce:
  - `Client ID` → variable `GOOGLE_OAUTH_CLIENT_ID`
  - `Client secret` → variable `GOOGLE_OAUTH_CLIENT_SECRET`

### 5. Generar el refresh token (una sola vez, en local)

En una máquina con Node 18+:

```bash
# Definir las credenciales del OAuth Client como variables de entorno
set GOOGLE_OAUTH_CLIENT_ID=xxxxx.apps.googleusercontent.com
set GOOGLE_OAUTH_CLIENT_SECRET=GOCSPX-xxxxxxxx

# Ejecutar el script
node scripts/get-refresh-token.js
```

El script:

1. Abre el navegador en la pantalla de Google.
2. Inicias sesión como `webmaster@ingeverasociados.com`.
3. Aceptas el scope `gmail.send`.
4. Google devuelve un `code` al `localhost:53682`.
5. El script imprime el `refresh_token` en consola.

**Copia el `refresh_token` a la variable `GOOGLE_OAUTH_REFRESH_TOKEN` en
Netlify.** Ya no es necesario volver a generar este token salvo que se
revoque el acceso desde
[https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)
o se rote el Client Secret.

> Si el `refresh_token` viene vacío, es porque ya existía un refresh
> token para esta combinación Client + usuario. Revoca el acceso previo
> y vuelve a ejecutar el script.

---

## Configuración en Netlify

### 1. Variables de entorno

En el panel de Netlify, ir a:

> **Site → Site settings → Environment variables → Add a variable**

Agregar las siguientes variables (scope: **All scopes**):

| Variable | Valor de ejemplo | Obligatoria |
| --- | --- | --- |
| `GOOGLE_OAUTH_CLIENT_ID` | `xxxxx.apps.googleusercontent.com` | Sí |
| `GOOGLE_OAUTH_CLIENT_SECRET` | `GOCSPX-xxxxx` | Sí |
| `GOOGLE_OAUTH_REFRESH_TOKEN` | `1//0gxxxxx` | Sí |
| `MAIL_FROM_ADDRESS` | `webmaster@ingeverasociados.com` | Sí |
| `MAIL_FROM_NAME` | `Ingever Asociados S.A.S.` | Opcional |
| `COTIZACIONES_EMAIL` | `ingenieria@ingeverasociados.com` | Sí |
| `EMPLEO_EMAIL` | `talentohumano@ingeverasociados.com` | Sí |
| `SITE_ORIGIN` | `https://ingeverasociados.com` | Sí |

> No se usan variables SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
> `SMTP_USER`, `SMTP_PASS`). Google Workspace no permite crear App
> Password para esta cuenta, y Gmail API + OAuth 2.0 no las necesita.

### 2. Despliegue

Una vez configuradas las variables, hacer un nuevo deploy:

```bash
git add .
git commit -m "feat: envío de notificaciones vía Gmail API + OAuth 2.0"
git push
```

Netlify detecta `netlify.toml`, compila el sitio y registra la Function
`submit-form` automáticamente. `googleapis` se incluye en el bundle de
la Function porque está en `package.json`.

---

## Plantillas de email

Las plantillas viven en `netlify/functions/lib/emailTemplates.js` y están
construidas con **tablas anidadas** para máxima compatibilidad:

- Gmail (web, iOS, Android)
- Outlook (2016+, web, Mac)
- Apple Mail
- Yahoo Mail
- Clientes móviles en general

**No se usa** flexbox, grid, `:root`, transforms ni animaciones, porque
muchos clientes de correo las ignoran o las rompen.

### Identidad visual aplicada

- Banda dorada superior (`#F4B400`).
- Cabecera navy (`#0B1F4A`) con logo y marca.
- Tipografía: Helvetica/Arial (fallback seguro en todos los clientes).
- Acentos en dorado, body en gris oscuro sobre blanco.
- Footer con sitio web y tagline corporativo.

### Estructura del correo (cotización)

1. Eyebrow: "Nueva solicitud de cotización".
2. Título: "Nueva solicitud de cotización".
3. Bloque: **Información del solicitante** (nombre, empresa, correo,
   teléfono, recibido).
4. Bloque: **Servicio solicitado** (tipo de servicio).
5. Bloque: **Descripción del proyecto**.
6. Bloque: **Archivo adjunto** (nombre, tipo, peso + nota de que también
   está en Netlify Forms).
7. Botón: **Responder al solicitante** (mailto con Reply-To).

### Estructura del correo (postulación)

1. Eyebrow: "Nueva postulación laboral".
2. Título: "Nueva postulación laboral".
3. Bloque: **Información del candidato** (nombre, cargo al que aspira,
   correo, teléfono, área de interés, recibido).
4. Bloque: **Presentación**.
5. Bloque: **Hoja de vida** (adjunto).
6. Botón: **Responder al candidato** (mailto con Reply-To).
7. Footer corporativo.

---

## Reply-To

La Function envía los correos con:

- `From: "Ingever Asociados S.A.S." <webmaster@ingeverasociados.com>`
- `Reply-To: <correo del cliente / candidato>`

Así, cuando el equipo de Ingever pulsa "Responder" en su cliente de
correo, el mensaje va directo a la persona que envió la solicitud.

---

## Cómo probar

### 1. Cotización sin archivo

1. Abrir `https://ingeverasociados.com/contacto`.
2. Llenar todos los campos.
3. Pulsar **Enviar solicitud**.
4. Verificar:
   - Aparece el mensaje de éxito.
   - Llega un email HTML a `COTIZACIONES_EMAIL` con los datos.
   - En Netlify → Forms aparece el envío con el form `cotizacion`.

### 2. Cotización con archivo

1. Mismo formulario, adjuntar un PDF o imagen pequeña.
2. Verificar:
   - Email HTML muestra nombre, tipo y peso del archivo.
   - En Netlify → Forms → Submission → el archivo está disponible
     como URL firmada.

### 3. Postulación sin hoja de vida

1. Abrir `https://ingeverasociados.com/trabaja-con-nosotros`.
2. Llenar todos los campos.
3. Verificar:
   - Email HTML llega a `EMPLEO_EMAIL`.
   - Aparece en Netlify Forms con el form `postulacion-laboral`.

### 4. Postulación con hoja de vida

1. Adjuntar un PDF.
2. Verificar lo anterior + el bloque **Hoja de vida** en el email.

---

## Manejo de errores

- Si la Function falla al enviar el email **y** al reenviar a Netlify
  Forms, el frontend muestra el mensaje genérico:
  > "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos
  > momentos."
- Si falla solo el email pero Netlify Forms sí registró, también se
  muestra el mensaje (para no dar falsa sensación de éxito al cliente).
- El honeypot `bot-field` se valida en la Function: si está relleno,
  la Function devuelve `200 ok` y no envía nada (comportamiento idéntico
  al de Netlify Forms).

### Errores típicos de Gmail API

- **`invalid_grant`**: el refresh token fue revocado o el Client Secret
  cambió. Regenera el refresh token con `node scripts/get-refresh-token.js`.
- **`insufficient authentication scopes`**: el refresh token se generó
  con un scope distinto al actual. Regenera el refresh token (asegúrate
  de aceptar el scope `gmail.send`).
- **`Daily user send quota exceeded`**: Gmail limita el envío por
  usuario (1500/día en cuentas Workspace normales). No aplica a este
  caso de uso, pero queda documentado.

---

## Costos

- **Netlify Functions**: 125 000 invocaciones/mes en el plan Free.
  Dos formularios no llegan ni a 0.1% de ese límite.
- **Gmail API**: incluida en Google Workspace. No añade costo.
- **googleapis**: librería open source, sin costo.

**Total: $0 adicional.**

---

## Seguridad

- Las credenciales OAuth **nunca** están en el código fuente. Se leen
  desde `process.env` dentro de la Function.
- `src/` no contiene secretos. El frontend no recibe credenciales
  nuevas.
- El scope es el **mínimo** necesario:
  `https://www.googleapis.com/auth/gmail.send`. La Function **no** puede
  leer buzones, borrar correos ni hacer nada distinto de enviar.
- El refresh token es de larga duración pero puede revocarse en
  cualquier momento desde
  [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions).
- El access token se cachea en memoria dentro del proceso de la
  Function y se rota automáticamente cuando expira (cada ~60 min).
- El `Reply-To` se toma del campo `correo` enviado por el usuario; el
  cliente de correo del receptor no confía en él (es solo una cabecera),
  por lo que no hay riesgo de suplantación al destinatario.
- El honeypot `bot-field` se valida para filtrar bots básicos.

---

## Cambiar de cuenta de envío

Si en el futuro se quiere usar otra cuenta (por ejemplo
`notificaciones@ingeverasociados.com`):

1. Habilita Gmail API para esa cuenta en Google Cloud (ya está a nivel
   de proyecto, pero el refresh token es por usuario).
2. Ejecuta de nuevo `node scripts/get-refresh-token.js` iniciando
   sesión con esa cuenta.
3. Actualiza `MAIL_FROM_ADDRESS` y `GOOGLE_OAUTH_REFRESH_TOKEN` en
   Netlify.

El resto del sistema no cambia.
