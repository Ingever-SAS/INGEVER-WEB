import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaHardHat } from "react-icons/fa";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

function JoinTeam() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F6F8FC] py-16 sm:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0B1F4A] px-6 py-10 text-white shadow-[0_28px_70px_rgba(11,31,74,0.2)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:46px_46px]" />
          <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#15589D]/40 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-28 left-1/3 -z-10 h-56 w-56 rounded-full border border-[#F4B400]/20" />
          <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
            <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[#F4B400]/35 bg-[#F4B400]/10 text-3xl text-[#F4B400] shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:h-20 sm:w-20 sm:text-4xl">
              <FaHardHat aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4B400]">Talento Ingever</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Construyamos soluciones que mueven la industria.</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Si buscas crecer en proyectos de ingeniería, mantenimiento y soluciones
                industriales, queremos conocerte.
              </p>
            </div>
            <Button to="/trabaja-con-nosotros" size="lg" className="group w-full lg:w-auto">
              Enviar hoja de vida
              <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default JoinTeam;
