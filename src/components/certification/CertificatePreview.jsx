import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import certificateImage from "../../assets/images/certifications/sgs-iso-9001-2015.png";
import { company } from "../../data/company";

function CertificatePreview({ variant = "feature" }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const dialogTitleId = useId();
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeDialog = () => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openDialog = () => setIsOpen(true);
  const isFooter = variant === "footer";

  const dialog = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#061733]/85 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-white p-5 shadow-2xl sm:p-8"
          >
            <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400] to-transparent" />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDialog}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-[#0B1F4A]/10 text-[#0B1F4A] transition hover:border-[#F4B400] hover:bg-[#FFF9E8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25"
              aria-label="Cerrar certificación"
            >
              <FaTimes aria-hidden="true" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="grid h-32 w-32 place-items-center rounded-3xl border border-[#0B1F4A]/10 bg-[#F6F8FC] p-4 shadow-sm sm:h-40 sm:w-40 sm:p-5">
                <img src={certificateImage} alt="Sello SGS ISO 9001:2015" className="h-full w-full object-contain" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F4A]">Certificación de calidad</p>
              <h2 id={dialogTitleId} className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#0B1F4A] sm:text-3xl">
                {company.certificate.standard}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#52667B] sm:text-base sm:leading-7">
                {company.certificate.issuer} · Certificado {company.certificate.identifier} · Emitido el {company.certificate.issuedAt}.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {isFooter ? (
        <section className="group relative mt-5 overflow-hidden rounded-2xl border border-white/14 bg-white/[0.06] p-3 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#F4B400]/45 hover:bg-white/[0.09]">
          <div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-white/15 bg-white p-2 shadow-sm">
              <img src={certificateImage} alt="Sello SGS ISO 9001:2015" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F4B400]">{company.certificate.standard}</p>
              <p className="mt-1 text-xs leading-5 text-white/68">Gestión respaldada por SGS System Certification.</p>
            </div>
          </div>
          <button
            ref={triggerRef}
            type="button"
            onClick={openDialog}
            className="relative mt-3 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#F4B400] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25"
          >
            Ver certificación
            <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </section>
      ) : (
        <section className="relative mt-6 overflow-hidden rounded-2xl border border-[#0B1F4A]/10 bg-[#F6F8FC] p-3">
          <div aria-hidden="true" className="absolute right-0 top-0 h-12 w-12 rounded-bl-3xl border-b border-l border-[#F4B400]/25" />
          <div className="relative flex items-center gap-3">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-[#0B1F4A]/10 bg-white p-2 shadow-sm">
              <img src={certificateImage} alt="Sello SGS ISO 9001:2015" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#0B1F4A]">{company.certificate.standard}</p>
              <p className="mt-1 text-xs leading-5 text-[#52667B]">Certificación SGS que respalda nuestros procesos.</p>
            </div>
          </div>
          <button
            ref={triggerRef}
            type="button"
            onClick={openDialog}
            className="group/button relative mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0B1F4A] transition-colors hover:text-[#15589D] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25"
          >
            Ver certificado
            <FaArrowRight aria-hidden="true" className="text-[#F4B400] transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>
        </section>
      )}

      {typeof document !== "undefined" ? createPortal(dialog, document.body) : null}
    </>
  );
}

export default CertificatePreview;
