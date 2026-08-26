// Envío de formularios a Netlify Forms y notificación por Netlify Function.

/**
 * Envía el formulario completo a Netlify Forms.
 *
 * IMPORTANTE:
 * Esta función se usa directamente desde el navegador para que
 * los archivos adjuntos NO pasen por la Netlify Function.
 */
export async function submitToNetlifyForms(form) {
  const response = await fetch("/", {
    method: "POST",
    body: new FormData(form),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");

    console.error(
      "Netlify Forms error:",
      response.status,
      responseText,
    );

    throw new Error("No fue posible registrar el formulario.");
  }

  return true;
}

/**
 * Envía únicamente los datos de texto a la Netlify Function.
 *
 * No incluye archivos.
 * Esto evita el error 413 Content Too Large.
 */
export async function notifyNetlifyFunction(form) {
  const formData = new FormData(form);

  const data = {};

  for (const [key, value] of formData.entries()) {
    // Ignoramos archivos.
    if (value instanceof File) {
      continue;
    }

    data[key] = value;
  }

  const response = await fetch("/.netlify/functions/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseText = await response.text();

  console.log("submit-form status:", response.status);
  console.log("submit-form response:", responseText);

  if (!response.ok) {
    throw new Error(
      responseText || "No fue posible enviar la notificación.",
    );
  }

  return true;
}

/**
 * Mantiene la función anterior para los formularios
 * que todavía utilizan el flujo completo por Function.
 */
export async function submitNetlifyForm(form) {
  const response = await fetch("/.netlify/functions/submit-form", {
    method: "POST",
    body: new FormData(form),
  });

  const responseText = await response.text();

  console.log("submit-form status:", response.status);
  console.log("submit-form response:", responseText);

  if (!response.ok) {
    throw new Error(
      responseText || "No fue posible enviar el formulario.",
    );
  }

  return responseText;
}