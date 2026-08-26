import { motion, useReducedMotion } from "framer-motion";

function ClientLogoCard({ logo, name, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <article className="group relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#0B1F4A]/10 bg-white p-6 shadow-[0_10px_24px_rgba(11,31,74,0.05)] transition-[border-color,box-shadow] duration-500 hover:border-[#F4B400]/45 hover:shadow-[0_18px_38px_rgba(11,31,74,0.11)] sm:h-40 sm:p-8">
        <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/75 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={logo}
          alt={name}
          className="relative max-h-full w-auto max-w-full object-contain grayscale opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
        />
      </article>
    </motion.article>
  );
}

export default ClientLogoCard;
