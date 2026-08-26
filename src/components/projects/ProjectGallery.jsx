import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaExpand } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1];

function normalizeGalleryItem(item, index) {
  if (typeof item === "string") {
    return {
      src: item,
      alt: `Imagen ${index + 1} del proyecto`,
      caption: "",
    };
  }

  return {
    src: item?.src ?? item?.image ?? item?.url ?? "",
    alt: item?.alt ?? item?.title ?? `Imagen ${index + 1} del proyecto`,
    caption: item?.caption ?? "",
  };
}

function getItemLayout(index) {
  if (index === 0) {
    return "sm:col-span-2 lg:col-span-7";
  }

  return "lg:col-span-5";
}

function ProjectGallery({ gallery = [], title = "Galería del proyecto", className = "" }) {
  const sectionId = useId();
  const openerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const items = useMemo(
    () => (Array.isArray(gallery) ? gallery : [])
      .map(normalizeGalleryItem)
      .filter((item) => item.src),
    [gallery],
  );

  const isOpen = activeIndex !== null && items.length > 0;
  const currentIndex = isOpen ? Math.min(activeIndex, items.length - 1) : 0;
  const activeItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimeout = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft" && items.length > 1) {
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
      }

      if (event.key === "ArrowRight" && items.length > 1) {
        setActiveIndex((current) => (current + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length]);

  if (items.length === 0) {
    return null;
  }

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const openImage = (index, event) => {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  return (
    <section className={className} aria-labelledby={sectionId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">Registro visual</p>
          <h2 id={sectionId} className="mt-2 text-2xl font-bold tracking-tight text-[#0A2A4B] sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? "fotografía" : "fotografías"}
        </p>
      </div>

      <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
        {items.map((item, index) => (
          <motion.li
            key={`${item.src}-${index}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
            className={getItemLayout(index)}
          >
            <button
              type="button"
              onClick={(event) => openImage(index, event)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-[#0A2A4B]/10 bg-[#F6F7F8] text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15589D]/30 active:translate-y-0"
              aria-label={`Ampliar ${item.alt}`}
            >
              <div className={index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#06192D]/80 via-[#06192D]/20 to-transparent p-4 pt-12 text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5">
                <span className="text-sm font-semibold">{item.caption || item.alt}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-sm" aria-hidden="true">
                  <FaExpand />
                </span>
              </div>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && activeItem && (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06192D]/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setActiveIndex(null);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Vista ampliada: ${activeItem.alt}`}
              className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A2A4B] shadow-2xl"
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.34, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-5">
                <p className="min-w-0 truncate text-sm font-semibold sm:text-base">{activeItem.caption || activeItem.alt}</p>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Cerrar
                </button>
              </div>

              <div className="relative min-h-0 flex-1 bg-black/20">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={activeItem.src}
                    src={activeItem.src}
                    alt={activeItem.alt}
                    className="max-h-[72vh] w-full object-contain"
                    initial={{ opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                </AnimatePresence>

                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/65 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:left-5"
                      aria-label="Ver imagen anterior"
                    >
                      <FaArrowLeft aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/65 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:right-5"
                      aria-label="Ver imagen siguiente"
                    >
                      <FaArrowRight aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {items.length > 1 && (
                <p className="px-4 py-3 text-center text-sm font-medium text-white/70">
                  {currentIndex + 1} de {items.length}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectGallery;
