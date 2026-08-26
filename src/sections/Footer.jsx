import { motion, useReducedMotion } from "framer-motion";
import {
  FaBriefcase,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Logo2 } from "../components/Logo";
import CertificatePreview from "../components/certification/CertificatePreview";
import Container from "../components/ui/Container";
import { company } from "../data/company";
import { navigation } from "../data/navigation";

const socialPlatforms = [
  { key: "facebook", label: "Facebook", icon: FaFacebookF },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "computrabajo", label: "Computrabajo", icon: FaBriefcase },
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
];

function FooterHeading({ children }) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-white after:h-px after:w-8 after:bg-[#F4B400] after:content-['']">
      {children}
    </h3>
  );
}

function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-[#0B1F4A] pt-12 text-white sm:pt-16"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[#15589D]/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#F4B400]/8 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:58px_58px]" />

      <Container className="relative z-10">
        <div className="grid gap-10 border-b border-white/12 pb-10 sm:grid-cols-2 sm:gap-x-8 lg:pb-12 xl:grid-cols-[1.1fr_0.95fr_0.72fr_1.15fr] xl:gap-10">
          <div className="max-w-sm">
            <a href="/#inicio" aria-label="Ir al inicio" className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25">
              <Logo2 className="h-16 sm:h-[5.5rem]" />
            </a>
            <p className="mt-5 text-lg font-semibold leading-7 text-white sm:text-xl">{company.slogan}</p>
            <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
              Soluciones técnicas para el montaje, mantenimiento y modernización de sistemas de izaje industrial.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5" aria-label="Redes sociales">
              {socialPlatforms.map(({ key, label, icon: Icon }) => {
                const url = company.socialUrls[key];
                const classes = "grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.06] text-white/75 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25";

                if (!url) {
                  return (
                    <span
                      key={key}
                      className={`${classes} cursor-default opacity-55 hover:-translate-y-1 hover:border-[#F4B400]/65 hover:bg-[#F4B400] hover:text-[#0B1F4A]`}
                      aria-hidden="true"
                      title={`${label}: enlace pendiente de configurar`}
                    >
                      <Icon aria-hidden="true" />
                    </span>
                  );
                }

                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${label} de Ingever Asociados`}
                    className={`${classes} hover:-translate-y-1 hover:border-[#F4B400]/65 hover:bg-[#F4B400] hover:text-[#0B1F4A]`}
                    whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.04 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                  >
                    <Icon aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <FooterHeading>Contacto</FooterHeading>
            <address className="mt-5 space-y-4 not-italic text-sm leading-6 text-white/65">
              <a
                href={company.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-colors hover:text-white"
              >
                <FaMapMarkerAlt aria-hidden="true" className="mt-1 shrink-0 text-[#F4B400]" />
                <span>{company.address}</span>
              </a>
              <a href={`mailto:${company.email}`} className="group inline-flex items-center gap-3 transition-colors hover:text-white">
                <FaEnvelope aria-hidden="true" className="shrink-0 text-[#F4B400]" />
                <span>{company.email}</span>
              </a>
              <a href={`tel:${company.phones[0].replace(/\s/g, "")}`} className="group inline-flex items-center gap-3 transition-colors hover:text-white">
                <FaPhoneAlt aria-hidden="true" className="shrink-0 text-[#F4B400]" />
                <span>{company.phones[0]}</span>
              </a>
              <a
                href={company.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 transition-colors hover:text-white"
              >
                <FaWhatsapp aria-hidden="true" className="shrink-0 text-[#F4B400]" />
                <span>Escríbenos por WhatsApp</span>
              </a>
            </address>
          </div>

          <div>
            <FooterHeading>Navegación</FooterHeading>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/65 sm:block sm:space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#F4B400] opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Calidad certificada</FooterHeading>
            <p className="mt-5 text-sm leading-6 text-white/65">
              Procesos orientados a la mejora continua y respaldados por nuestra certificación ISO.
            </p>
            <CertificatePreview variant="footer" />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-xs text-white/48 sm:py-7 lg:flex-row lg:items-center lg:justify-between lg:text-sm">
          <p>© 2026 Ingever Asociados S.A.S. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Diseñado por Ingever Asociados</span>
            <a
              href={company.legal.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#F4B400]"
            >
              Política de privacidad
            </a>
            {company.legal.termsUrl ? (
              <a
                href={company.legal.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#F4B400]"
              >
                Términos y condiciones
              </a>
            ) : (
              <span title="Enlace pendiente de configurar">Términos y condiciones</span>
            )}
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}

export default Footer;
