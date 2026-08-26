import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaShieldAlt } from "react-icons/fa";
import heroImage from "../assets/images/hero.png";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { company } from "../data/company";

const EASE = [0.22, 1, 0.36, 1];

const heroStats = [
  { value: company.experience, label: "Años de experiencia" },
  { value: company.coverage, label: "Ciudades" },
  { value: "360°", label: "Soluciones integrales" },
];

function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const itemTransition = (delay) => (
    shouldReduceMotion ? { duration: 0 } : { duration: 0.62, delay, ease: EASE }
  );

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#0B1F4A] pb-12 pt-32 sm:min-h-[720px] sm:pb-16 sm:pt-36 lg:min-h-[800px] lg:pb-20 lg:pt-40"
    >
      <motion.img
        src={heroImage}
        alt="Puente grúa industrial instalado por Ingever"
        initial={shouldReduceMotion ? false : { scale: 1.04 }}
        animate={shouldReduceMotion ? undefined : { scale: 1.1, x: -14 }}
        transition={shouldReduceMotion ? undefined : { duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-y-0 left-0 -z-30 h-full w-full object-cover object-center lg:-left-[15%] lg:w-[115%] lg:max-w-none"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(104deg,_rgba(11,31,74,0.99)_0%,_rgba(11,31,74,0.94)_43%,_rgba(11,31,74,0.55)_72%,_rgba(11,31,74,0.42)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_right,black,transparent_78%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-[#0B1F4A] to-transparent" />
      <div aria-hidden="true" className="absolute -right-28 top-1/4 -z-10 h-80 w-80 rounded-full border border-[#5A98D4]/30 bg-[#15589D]/20 blur-2xl sm:h-[28rem] sm:w-[28rem]" />
      <div aria-hidden="true" className="absolute bottom-[18%] left-0 -z-10 h-px w-36 bg-gradient-to-r from-transparent via-[#F4B400] to-transparent opacity-80 sm:w-56" />

      <Container className="relative z-10 lg:pl-[10%]">
        <div className="max-w-4xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.08)}
            className="inline-flex items-center gap-2 rounded-full border border-[#F4B400]/35 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm sm:px-4"
          >
            <FaShieldAlt aria-hidden="true" className="text-[#F4B400]" />
            CONFIANZA QUE ELEVA TU OPERACIÓN
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.16)}
            className="mt-6 text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:mt-8 lg:text-7xl"
          >
            Elevamos el rendimiento de tu operación.
            <span className="relative block w-fit">
              
              <span aria-hidden="true" className="absolute -bottom-2 left-0 h-1 w-16 rounded-full bg-[#F4B400] sm:w-20" />
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.26)}
            className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 lg:mt-8 lg:text-xl"
          >
            Acompañamos a nuestros clientes en cada etapa de sus proyectos con soluciones confiables para puentes grúa, polipastos y sistemas de izaje, garantizando seguridad, eficiencia y continuidad operativa.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition(0.36)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10"
          >
            <Button
              id="hero-quote-cta"
              to="/contacto"
              size="lg"
              className="group w-full border-[#15589D] bg-[#15589D] shadow-[0_14px_34px_rgba(1,15,43,0.34)] hover:border-[#F4B400] hover:bg-[#0F4E91] hover:shadow-[0_16px_38px_rgba(244,180,0,0.2)] sm:w-auto"
            >
              Solicitar cotización
              <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              href="#conocenos"
              variant="light"
              size="lg"
              className="w-full border-white/70 bg-white/5 hover:border-[#F4B400] hover:bg-white hover:text-[#0B1F4A] sm:w-auto"
            >
              Conócenos
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={itemTransition(0.48)}
          className="mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),rgba(255,255,255,0.045))] px-4 py-4 shadow-[0_18px_42px_rgba(1,15,43,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400]/60 hover:shadow-[0_20px_48px_rgba(1,15,43,0.36)] sm:px-5 sm:py-5"
            >
              <span aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/75 to-transparent opacity-70" />
              <span aria-hidden="true" className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[#F4B400]/10 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              <p className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{stat.value}</p>
              <p className="relative mt-1 text-xs font-medium text-white/70 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
