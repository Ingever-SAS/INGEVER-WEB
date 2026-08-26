import { motion, useReducedMotion } from "framer-motion";

function ServiceCard({ title, description, icon: Icon, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const serviceNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={shouldReduceMotion ? undefined : { y: -7 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_16px_38px_rgba(11,31,74,0.07)] transition-[border-color,box-shadow] duration-500 hover:border-[#F4B400]/55 hover:shadow-[0_24px_52px_rgba(11,31,74,0.14)] sm:p-7">
        <div
          aria-hidden="true"
          className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute -right-14 -top-14 h-36 w-36 rounded-full border border-[#15589D]/10 bg-[#15589D]/5 transition-transform duration-700 group-hover:scale-150"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-20 w-20 bg-[linear-gradient(135deg,transparent_49%,rgba(244,180,0,0.13)_50%,transparent_51%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#15589D]/20 bg-[#0B1F4A] text-white shadow-[0_12px_24px_rgba(11,31,74,0.2)] transition-all duration-500 group-hover:border-[#F4B400]/70 group-hover:bg-[#123A77] group-hover:shadow-[0_14px_28px_rgba(11,31,74,0.28)] sm:h-16 sm:w-16">
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#F4B400]"
            />
            <Icon className="text-2xl sm:text-3xl" aria-hidden="true" />
          </div>

          <span className="text-xs font-bold tracking-[0.2em] text-[#0B1F4A]/35 transition-colors duration-300 group-hover:text-[#F4B400]">
            {serviceNumber}
          </span>
        </div>

        <h3 className="relative mt-6 text-xl font-bold tracking-[-0.02em] text-[#0B1F4A] sm:text-2xl">
          {title}
        </h3>

        <p className="relative mt-3 text-sm leading-6 text-[#52667B] sm:text-base sm:leading-7">
          {description}
        </p>

        <span
          aria-hidden="true"
          className="relative mt-6 h-px w-12 bg-[#0B1F4A]/10 transition-all duration-500 group-hover:w-20 group-hover:bg-[#F4B400]"
        />
      </div>
    </motion.article>
  );
}

export default ServiceCard;
