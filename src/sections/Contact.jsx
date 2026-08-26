import { motion, useReducedMotion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { company } from "../data/company";

const contactItems = [
  { icon: FaMapMarkerAlt, title: "Dirección", value: company.address },
  { icon: FaPhoneAlt, title: "Teléfono", value: company.phones[0] },
  { icon: FaEnvelope, title: "Correo electrónico", value: company.email },
];

function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contacto" className="relative overflow-hidden bg-[#F6F8FC] py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(11,31,74,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.8)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />

      <Container className="relative z-10">
        <SectionTitle subtitle="Contacto" title="Hablemos de la próxima maniobra" />

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-[#0B1F4A]/70 sm:mt-6 sm:text-lg sm:leading-8">
          Cuéntanos las necesidades de tu operación y te ayudaremos a definir una
          solución técnica clara, segura y eficiente.
        </p>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-[#0B1F4A]/15 bg-[#0B1F4A] shadow-[0_28px_70px_rgba(11,31,74,0.2)] sm:mt-12 lg:mt-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden p-6 text-white sm:p-8 lg:p-10"
          >
            <div aria-hidden="true" className="absolute -left-28 -top-28 h-64 w-64 rounded-full bg-[#15589D]/35 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />
            <div aria-hidden="true" className="absolute -bottom-20 -right-16 h-44 w-44 rounded-full border border-[#F4B400]/20" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4B400]">Ingever Asociados</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">Un equipo técnico cerca de tu operación.</h3>

              <div className="mt-8 space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-4 transition-colors duration-300 hover:border-[#F4B400]/35 hover:bg-white/[0.1]">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/10 text-[#F4B400]">
                        <Icon aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="mt-1 break-words text-sm leading-6 text-white/70">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={company.mapUrl} target="_blank" rel="noopener noreferrer" variant="light" className="w-full sm:w-auto">
                  Ver ubicación
                </Button>
                <Button to="/contacto" className="w-full sm:w-auto">
                  Cuéntanos tu proyecto
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="relative min-h-80 overflow-hidden border-t border-white/10 bg-white lg:min-h-full lg:border-l lg:border-t-0">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-[#F4B400]" />
            <iframe
              src={company.location}
              className="h-full min-h-80 w-full lg:min-h-[540px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ubicación Ingever Asociados"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
