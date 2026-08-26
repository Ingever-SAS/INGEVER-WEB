// Envía el formulario a la Netlify Function "submit-form".
//
// La función:
//  1. Reenvía el form a Netlify Forms (preserva el panel de Netlify y los
//     archivos adjuntos).
//  2. Envía un email HTML corporativo con los mismos datos y Reply-To al
//     correo del usuario.
//
// Si la función no responde 2xx, lanzamos un error para que el componente
// muestre el mensaje amigable de error. No exponemos detalles técnicos al
// usuario.

export async function submitNetlifyForm(form) {
  const response = await fetch("/.netlify/functions/submit-form", {
    method: "POST",
    body: new FormData(form),
  });

  if (!response.ok) {
    throw new Error("No fue posible enviar el formulario.");
  }
}
