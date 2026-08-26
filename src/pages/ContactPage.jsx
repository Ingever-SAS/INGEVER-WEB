import { useState } from "react";
import Button from "../components/ui/Button";
import { submitNetlifyForm } from "../utils/netlifyForms";

const fieldClassName =
  "w-full rounded-xl border border-[#0B1F4A]/15 bg-white px-4 py-3 text-sm text-[#0B1F4A] shadow-sm outline-none transition-all duration-300 placeholder:text-[#0B1F4A]/35 hover:border-[#15589D]/45 focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/15 sm:px-5 sm:py-4 sm:text-base";

function ContactPage() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setEnviando(true);
    setError("");

    try {
      await submitNetlifyForm(form);
      form.reset();
      setEnviado(true);
    } catch {
      setError(
        "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos momentos.",
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F6F8FC] px-4 py-24 sm:px-6 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(11,31,74,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.8)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#15589D]/12 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-10 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#0B1F4A]/12 bg-white p-5 shadow-[0_28px_70px_rgba(11,31,74,0.12)] sm:rounded-3xl sm:p-8 lg:p-10">
        <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />
        <div className="relative z-10">
        <h1 className="text-center text-3xl font-bold leading-tight text-[#0B1F4A] sm:text-4xl lg:text-5xl">
          Solicitar cotización
        </h1>

        <p className="mx-auto mt-5 max-w-2xl rounded-xl border border-[#0B1F4A]/8 bg-[#F6F8FC] px-4 py-3 text-center text-sm leading-6 text-[#0B1F4A]/70 sm:mt-6 sm:px-6 sm:py-4 sm:text-base sm:leading-7">
          Completa el siguiente formulario y uno de nuestros asesores se pondrá
          en contacto contigo lo antes posible.
        </p>

        {!enviado ? (
          <form
            name="cotizacion"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 sm:mt-12 sm:space-y-8"
          >
            <input type="hidden" name="form-name" value="cotizacion" />

            <p className="sr-only" aria-hidden="true">
              <label htmlFor="cotizacion-bot-field">
                No completes este campo
                <input
                  id="cotizacion-bot-field"
                  name="bot-field"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </label>
            </p>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  autoComplete="name"
                  className={fieldClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="empresa" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder="Nombre de la empresa"
                  autoComplete="organization"
                  className={fieldClassName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="correo" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="correo@empresa.com"
                  autoComplete="email"
                  className={fieldClassName}
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+57 300 000 0000"
                  autoComplete="tel"
                  className={fieldClassName}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="servicio" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                Tipo de servicio
              </label>
              <select
                id="servicio"
                name="servicio"
                defaultValue=""
                className={fieldClassName}
              >
                <option value="">Selecciona un servicio</option>
                <option>Puentes grúa</option>
                <option>Polipastos</option>
                <option>Mantenimiento</option>
                <option>Modernización</option>
                <option>Instalación</option>
                <option>Inspección</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="descripcion" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                Descripción del proyecto
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto..."
                className={`${fieldClassName} resize-y`}
              />
            </div>

            <div>
              <label htmlFor="archivo" className="mb-2 block text-sm font-semibold text-[#0B1F4A] sm:text-base">
                Adjuntar archivo (opcional)
              </label>
              <input
                id="archivo"
                name="archivo"
                type="file"
                className={`${fieldClassName} cursor-pointer border-dashed file:mr-3 file:rounded-lg file:border-0 file:bg-[#0B1F4A] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white sm:file:mr-4 sm:file:px-4 sm:file:text-sm`}
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5 sm:py-4 sm:text-base"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col sm:items-end">
              <Button
                type="submit"
                size="lg"
                loading={enviando}
                loadingLabel="Enviando solicitud..."
                className="w-full sm:w-auto"
              >
                Enviar solicitud
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-[#F4B400]/35 bg-[#FFF9E8] p-6 text-center sm:mt-12 sm:rounded-3xl sm:p-10 lg:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0B1F4A] text-3xl text-[#F4B400] sm:h-20 sm:w-20 sm:text-4xl">
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-bold text-[#0B1F4A] sm:mt-8 sm:text-4xl">
              ¡Solicitud enviada!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#0B1F4A]/70 sm:text-lg sm:leading-8">
              Gracias por confiar en Ingever Asociados S.A.S. Hemos recibido tu
              solicitud y uno de nuestros asesores se pondrá en contacto contigo
              en el menor tiempo posible.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setEnviado(false)}
                className="w-full sm:w-auto"
              >
                Enviar otra solicitud
              </Button>

              <Button to="/" variant="dark" className="w-full sm:w-auto">
                Volver al inicio
              </Button>
            </div>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
