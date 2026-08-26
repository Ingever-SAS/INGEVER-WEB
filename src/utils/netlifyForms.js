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
