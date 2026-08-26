import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function ProjectCard({ project, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const projectListReturn = {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    locationKey: location.key,
    historyDepth: 1,
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -7 }}
      className="h-full"
    >
      <Link
        to={`/proyectos/${project.slug}`}
        state={{ projectListReturn }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-white shadow-[0_14px_34px_rgba(11,31,74,0.07)] transition-[border-color,box-shadow] duration-500 hover:border-[#F4B400]/55 hover:shadow-[0_26px_54px_rgba(11,31,74,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25"
        aria-label={`Ver proyecto completo: ${project.title}`}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.heroImageAlt}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F4A]/80 via-[#0B1F4A]/12 to-transparent" />
          <span aria-hidden="true" className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/15 bg-[#0B1F4A]/80 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalle
            <FaArrowRight aria-hidden="true" className="text-[#F4B400]" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1F4A] sm:text-sm">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-[#F4B400]/12 text-[#0B1F4A]">
              <FaMapMarkerAlt aria-hidden="true" className="text-xs" />
            </span>
            {project.location}
          </p>

          <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.02em] text-[#0B1F4A] sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#52667B] sm:text-base sm:leading-7">
            {project.shortDescription}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B1F4A]">
            Ver proyecto completo
            <FaArrowRight aria-hidden="true" className="text-[#F4B400] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default ProjectCard;
