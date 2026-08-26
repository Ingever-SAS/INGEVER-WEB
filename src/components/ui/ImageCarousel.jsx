import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaExpand, FaPause, FaPlay, FaTimes } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_INTERVAL = 2822; // ms entre imágenes (40% más lento)
const RESET_INTERVAL = 6048;   // ms tras interacción manual

function normalizeItems(images, fallbackImage, fallbackAlt) {
  if (Array.isArray(images) && images.length > 0) {
    return images
      .map((item, index) => {
        if (typeof item === "string") {
          return {
            src: item,
            alt: `Imagen ${index + 1}`,
            caption: "",
          };
        }
        return {
          src: item?.src ?? "",
          alt: item?.alt ?? `Imagen ${index + 1}`,
          caption: item?.caption ?? "",
        };
      })
      .filter((item) => item.src);
  }

  if (fallbackImage) {
    return [{ src: fallbackImage, alt: fallbackAlt, caption: "" }];
  }

  return [];
}

function ImageCarousel({
  images,
  fallbackImage,
  fallbackAlt,
  title = "Galería",
  className = "",
}) {
  const sectionId = useId();
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [manualHoldUntil, setManualHoldUntil] = useState(0);

  const items = normalizeItems(images, fallbackImage, fallbackAlt);
  const count = items.length;
  const safeIndex = count === 0 ? 0 : Math.min(activeIndex, count - 1);
  const activeItem = items[safeIndex];

  const goPrev = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((current) => (current - 1 + count) % count);
    setManualHoldUntil(Date.now() + RESET_INTERVAL);
  }, [count]);

  const goNext = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((current) => (current + 1) % count);
    setManualHoldUntil(Date.now() + RESET_INTERVAL);
  }, [count]);

  const goTo = useCallback((index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setManualHoldUntil(Date.now() + RESET_INTERVAL);
  }, [activeIndex]);

  // Auto-advance del carrusel
  const now = Date.now();
  const isInteracting = isHovering || isFocused || lightboxOpen || touchStart !== null;
  const shouldAutoplay = count > 1 && !isAutoplayPaused && !isInteracting && now > manualHoldUntil && !shouldReduceMotion;

  useEffect(() => {
    if (!shouldAutoplay) return undefined;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [shouldAutoplay, safeIndex, count]);

  // Teclado y overflow en lightbox
  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen, goPrev, goNext]);

  if (count === 0) {
    return null;
  }

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goPrev();
      else goNext();
    }
    setTouchStart(null);
  };

  const panelTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.42, ease: EASE };

  return (
    <section
      ref={rootRef}
      className={className}
      aria-labelledby={sectionId}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">Registro visual</p>
          <h3 id={sectionId} className="mt-2 text-2xl font-bold tracking-tight text-[#0A2A4B] sm:text-3xl">
            {title}
          </h3>
        </div>

        {count > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoplayPaused((paused) => !paused)}
              aria-label={isAutoplayPaused ? "Reanudar rotación automática" : "Pausar rotación automática"}
              aria-pressed={isAutoplayPaused}
              disabled={shouldReduceMotion}
              className="grid size-10 place-items-center rounded-full border border-[#0A2A4B]/15 bg-white text-[#0A2A4B] shadow-sm transition hover:border-[#15589D] hover:bg-[#0A2A4B] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15589D]/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAutoplayPaused || shouldReduceMotion ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
            </button>
            <p className="text-sm text-gray-500">
              {count} {count === 1 ? "imagen" : "imágenes"}
            </p>
          </div>
        )}
      </div>

      <div
        className="mt-7 overflow-hidden rounded-2xl border border-[#0A2A4B]/10 bg-white shadow-xl shadow-[#0A2A4B]/10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carrusel"
        aria-label={title}
      >
        <div className="relative aspect-16/10 bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeItem.src}
              src={activeItem.src}
              alt={activeItem.alt}
              className="absolute inset-0 mx-auto my-auto h-full w-full max-h-full max-w-full object-contain p-4 sm:p-8"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
              transition={panelTransition}
              loading="lazy"
            />
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/70 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B400] active:scale-95 sm:left-4 sm:size-12"
              >
                <FaArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/70 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B400] active:scale-95 sm:right-4 sm:size-12"
              >
                <FaArrowRight aria-hidden="true" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ampliar imagen"
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-[#06192D]/70 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B400] sm:right-4 sm:top-4"
          >
            <FaExpand aria-hidden="true" />
          </button>

          {count > 1 && (
            <span
              aria-live="polite"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#06192D]/70 px-3 py-1 text-xs font-semibold text-white sm:bottom-4"
            >
              {safeIndex + 1} de {count}
            </span>
          )}
        </div>

        {count > 1 && (
          <div
            className="flex gap-2 overflow-x-auto border-t border-[#0A2A4B]/10 bg-[#F4F8FC] px-4 py-4 sm:px-5"
            aria-label="Seleccionar imagen"
          >
            {items.map((item, index) => {
              const isActive = index === safeIndex;
              return (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ver ${item.alt}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative shrink-0 overflow-hidden rounded-xl border-2 bg-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B400] ${
                    isActive
                      ? "border-[#15589D]"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                >
                  <div className="flex h-16 w-24 items-center justify-center sm:h-20 sm:w-28">
                    <img
                      src={item.src}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && activeItem && (
          <motion.div
            role="presentation"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06192D]/90 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxOpen(false);
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Vista ampliada: ${activeItem.alt}`}
              className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0A2A4B] shadow-2xl"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-5">
                <p className="min-w-0 truncate text-sm font-semibold sm:text-base">{activeItem.alt}</p>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="rounded-lg p-2 text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Cerrar"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center bg-black/40 p-2 sm:p-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={activeItem.src}
                    src={activeItem.src}
                    alt={activeItem.alt}
                    className="max-h-[72vh] max-w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: EASE }}
                  />
                </AnimatePresence>

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/65 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:left-5"
                      aria-label="Imagen anterior"
                    >
                      <FaArrowLeft aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#06192D]/65 text-white shadow-lg transition hover:scale-105 hover:bg-[#06192D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:right-5"
                      aria-label="Imagen siguiente"
                    >
                      <FaArrowRight aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {count > 1 && (
                <p className="px-4 py-3 text-center text-sm font-medium text-white/70">
                  {safeIndex + 1} de {count}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ImageCarousel;
