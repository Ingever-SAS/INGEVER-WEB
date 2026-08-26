import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { company } from "../data/company";

function WhatsAppFloatingButton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={company.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -3 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      className="group fixed bottom-5 right-4 z-[60] grid h-14 w-14 place-items-center rounded-2xl border border-white/50 bg-[#25D366] text-white shadow-[0_16px_34px_rgba(37,211,102,0.34)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(37,211,102,0.46)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/50 sm:bottom-7 sm:right-7 sm:h-[3.75rem] sm:w-[3.75rem]"
    >
      <span aria-hidden="true" className="absolute inset-1 rounded-[0.85rem] border border-white/25" />
      <FaWhatsapp aria-hidden="true" className="relative text-3xl sm:text-[2rem]" />
      <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-xl border border-white/15 bg-[#0B1F4A] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 lg:block">
        Escríbenos por WhatsApp
      </span>
    </motion.a>
  );
}

export default WhatsAppFloatingButton;
