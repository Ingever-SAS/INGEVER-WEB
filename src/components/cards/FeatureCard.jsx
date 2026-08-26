import { motion, useReducedMotion } from "framer-motion";
import CertificatePreview from "../certification/CertificatePreview";

function FeatureCard({ icon: Icon, title, description, certificate = false, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -5 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <article className="group relative h-full overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-white p-6 shadow-[0_14px_34px_rgba(11,31,74,0.07)] transition-[border-color,box-shadow] duration-500 hover:border-[#F4B400]/55 hover:shadow-[0_24px_52px_rgba(11,31,74,0.13)] sm:p-8">
        <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#15589D]/10 bg-[#15589D]/5 transition-transform duration-700 group-hover:scale-150" />

        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#15589D]/20 bg-[#0B1F4A] text-white shadow-[0_12px_24px_rgba(11,31,74,0.18)] transition-colors duration-500 group-hover:border-[#F4B400]/70 group-hover:bg-[#123A77] sm:h-16 sm:w-16">
          <span aria-hidden="true" className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#F4B400]" />
          <Icon className="text-2xl sm:text-3xl" aria-hidden="true" />
        </div>

        <h3 className="relative mt-6 text-xl font-bold tracking-[-0.02em] text-[#0B1F4A] sm:text-2xl">{title}</h3>

        <p className="relative mt-3 text-sm leading-6 text-[#52667B] sm:text-base sm:leading-7">
          {description}
        </p>

        {certificate ? (
          <CertificatePreview />
        ) : (
          <span aria-hidden="true" className="relative mt-6 block h-px w-12 bg-[#0B1F4A]/10 transition-all duration-500 group-hover:w-20 group-hover:bg-[#F4B400]" />
        )}
      </article>
    </motion.article>
  );
}

export default FeatureCard;
