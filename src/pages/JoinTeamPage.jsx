import { useState } from "react";
import Button from "../components/ui/Button";
import {
  submitToNetlifyForms,
  notifyNetlifyFunction,
} from "../utils/netlifyForms";


const fieldClassName =
  "w-full rounded-xl border border-[#0B1F4A]/15 bg-white px-4 py-3 text-sm text-[#0B1F4A] shadow-sm outline-none transition-all duration-300 placeholder:text-[#0B1F4A]/35 hover:border-[#15589D]/45 focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/15 sm:px-5 sm:py-4 sm:text-base";

function JoinTeamPage() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    console.log("POSTULACIÓN: handleSubmit ejecutado");

    setEnviando(true);
    setError("");

    try {
      // 1. Primero enviamos datos + PDF directamente a Netlify Forms.
      //    El archivo NO pasa por la Netlify Function.
      await submitToNetlifyForms(form);

      // 2. Después enviamos solamente los datos de texto a la Function.
      //    Esta petición es pequeña y no produce el error 413.
      await notifyNetlifyFunction(form);

      form.reset();
      setEnviado(true);
    } catch (error) {
      console.error("Error enviando postulación:", error);

      setError(
        "No pudimos enviar tu postulación. Inténtalo de nuevo en unos momentos.",
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F6F8FC] to-[#E8F1FA] px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[#0B1F4A]/12 bg-white p-5 shadow-[0_28px_70px_rgba(11,31,74,0.12)] sm:rounded-3xl sm:p-8 lg:p-12">
        {!enviado ? (
          <>
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#F4B400]/35 bg-[#F4B400]/10 sm:mb-8 sm:h-24 sm:w-24">
                <span className="text-3xl sm:text-5xl">👷</span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-[#0B1F4A] sm:text-4xl lg:text-5xl">
                Únete a nuestro equipo
              </h1>

              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#F4B400] sm:mt-6 sm:w-24" />

              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[#0B1F4A]/70 sm:mt-8 sm:text-lg sm:leading-8">
                En Ingever Asociados S.A.S. buscamos personas apasionadas por la
                ingeniería, el mantenimiento industrial y el trabajo en equipo.
                Si deseas formar parte de nuestra empresa, completa el siguiente
                formulario y adjunta tu hoja de vida.
              </p>
            </div>

            <form
              name="postulacion-laboral"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 sm:mt-12 sm:space-y-8"
            >
              <input
                type="hidden"
                name="form-name"
                value="postulacion-laboral"
              />

              <p className="sr-only" aria-hidden="true">
                <label htmlFor="postulacion-bot-field">
                  No completes este campo
                  <input
                    id="postulacion-bot-field"
                    name="bot-field"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </label>
              </p>

              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="postulante-nombre" className="mb-2 block text-sm font-medium sm:text-base">
                    Nombre completo
                  </label>
                  <input
                    id="postulante-nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Ingresa tu nombre"
                    autoComplete="name"
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label htmlFor="cargo" className="mb-2 block text-sm font-medium sm:text-base">
                    Cargo al que aspiras
                  </label>
                  <input
                    id="cargo"
                    name="cargo"
                    type="text"
                    placeholder="Ej. Soldador Industrial"
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="postulante-correo" className="mb-2 block text-sm font-medium sm:text-base">
                    Correo electrónico
                  </label>
                  <input
                    id="postulante-correo"
                    name="correo"
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label htmlFor="postulante-telefono" className="mb-2 block text-sm font-medium sm:text-base">
                    Teléfono
                  </label>
                  <input
                    id="postulante-telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="+57 300 000 0000"
                    autoComplete="tel"
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="area" className="mb-2 block text-sm font-medium sm:text-base">
                  Área de interés
                </label>
                <select id="area" name="area" defaultValue="" className={fieldClassName}>
                  <option value="">Selecciona un área</option>
                  {/* <option>Gerente General</option>
                  <option>Director General</option>
                  <option>Ingeniero De Operaciones</option>
                  <option>Asistente Administrativo</option>
                  <option>Auxiliar De talentos humanos</option> */}
                  <option>Inspector SST</option> 
                  <option>Mecánico Industrial</option>
                  <option>Electricista Industrial</option>
                  <option>Electromecánico Industrial</option>
                  <option>Electrónico Industrial</option>
                  <option>Técnico Mecánico</option>
                  {/* <option>Técnico Electricista</option>
                  <option>Técnico Electromecánico</option>
                  <option>Técnico Electrónico</option> */}
                  <option>Mantenimiento de automatismo industriales</option>
                </select>
              </div>

              <div>
                <label htmlFor="presentacion" className="mb-2 block text-sm font-medium sm:text-base">
                  Cuéntanos sobre ti
                </label>
                <textarea
                  id="presentacion"
                  name="presentacion"
                  rows={5}
                  placeholder="Háblanos de tu experiencia, habilidades y certificaciones."
                  className={`${fieldClassName} resize-y`}
                />
              </div>

              <div>
                <label htmlFor="hoja-de-vida" className="mb-2 block text-sm font-medium sm:text-base">
                  Adjuntar hoja de vida (PDF)
                </label>
                <input
                  id="hoja-de-vida"
                  name="hoja-de-vida"
                  type="file"
                  accept=".pdf,application/pdf"
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

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
                <Button to="/" variant="outline" className="w-full sm:w-auto">
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  loading={enviando}
                  loadingLabel="Enviando postulación..."
                  className="w-full sm:w-auto"
                >
                  Enviar hoja de vida
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-10 text-center sm:py-16 lg:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#0B1F4A] text-4xl text-[#F4B400] sm:h-28 sm:w-28 sm:text-5xl">
              ✓
            </div>

            <h2 className="mt-6 text-3xl font-bold text-[#0B1F4A] sm:mt-8 sm:text-4xl">
              ¡Postulación recibida!
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#0B1F4A]/70 sm:mt-6 sm:text-lg sm:leading-8">
              Gracias por postularte a Ingever Asociados S.A.S. Nuestro equipo
              revisará tu perfil y, si cumple con los requisitos, se pondrá en
              contacto contigo.
            </p>

            <Button to="/" size="lg" className="mt-8 sm:mt-10">
              Volver al inicio
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default JoinTeamPage;
