import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { company } from "../data/company";

const companyStats = [
  { value: company.experience, label: "Años de experiencia" },
  { value: company.coverage, label: "Ciudades" },
  { value: company.certification, label: "Compromiso de calidad" },
];

const principles = [
  "Diagnóstico técnico antes de intervenir",
  "Seguridad como criterio de decisión",
  "Acompañamiento desde el diseño hasta la operación",
];

function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="conocenos" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-[#15589D]/8 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-px w-1/3 bg-gradient-to-l from-[#F4B400]/70 to-transparent" />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] lg:gap-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle
              subtitle="Conócenos"
              title="Tu aliado estratégico en soluciones de izaje"
              align="left"
            />

            <div className="mt-6 max-w-2xl space-y-4 text-base leading-7 text-[#0B1F4A]/70 sm:text-lg sm:leading-8">
              <p>
                En <strong>Ingever Asociados S.A.S.</strong> desarrollamos soluciones
                especializadas para el montaje, desmontaje, mantenimiento,
                modernización de puentes grúa, polipastos y sistemas de
                izaje. Con <strong>14 años de experiencia</strong>, acompañamos al
                sector industrial, minero y metalmecánico con servicios que combinan
                experiencia técnica, seguridad y calidad en cada proyecto.
              </p>

              <p>
                Nuestra operación está respaldada por un <strong>Sistema de Gestión de
                  Calidad certificado bajo la norma ISO 9001:2015</strong>, lo que
                refleja nuestro compromiso con la mejora continua, la excelencia
                operativa y la garantía en cada uno de nuestros montajes y servicios.
                <p>
                  Trabajamos para convertir cada necesidad de izaje en una solución
                  confiable, eficiente y sostenible para nuestros clientes.
                </p>

              </p>
            </div>

            <ul className="mt-8 grid max-w-2xl gap-3">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-3 rounded-xl border border-[#0B1F4A]/8 bg-[#F6F8FC]/75 px-4 py-3 text-sm font-medium leading-6 text-[#0B1F4A] transition-colors hover:border-[#F4B400]/40 sm:text-base"
                >
                  <FaCheckCircle aria-hidden="true" className="mt-1 shrink-0 text-[#F4B400]" />
                  {principle}
                </li>
              ))}
            </ul>

            <Button href="#servicios" variant="outline" className="group mt-8">
              Explorar servicios
              <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0B1F4A] p-6 text-white shadow-[0_28px_70px_rgba(11,31,74,0.2)] sm:p-8 lg:p-10"
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-[#15589D]/45 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4B400]">Ingever en cifras</p>
              <p className="mt-4 max-w-sm text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                Una mirada técnica para decisiones que mueven la industria.
              </p>

              <div className="mt-8 grid gap-3">
                {companyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.07] px-5 py-5 transition-colors hover:border-[#F4B400]/45 hover:bg-white/[0.1]"
                  >
                    <p className="text-sm font-medium text-white/70">{stat.label}</p>
                    <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}

export default About;
