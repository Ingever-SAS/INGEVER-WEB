export async function submitNetlifyForm(form) {
  const response = await fetch("/", {
    method: "POST",
    body: new FormData(form),
  });

  if (!response.ok) {
    throw new Error("No fue posible enviar el formulario.");
  }
}
