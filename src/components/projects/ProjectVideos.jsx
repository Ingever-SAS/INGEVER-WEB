import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";

const EASE = [0.22, 1, 0.36, 1];

function getYoutubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace("www.", "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      videoId = parsedUrl.searchParams.get("v") ?? parsedUrl.pathname.split("/").filter(Boolean).pop() ?? "";
    }

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : url;
  } catch {
    return url;
  }
}

function normalizeVideo(video, index) {
  const type = video?.type === "youtube" ? "youtube" : "mp4";
  const source = type === "youtube"
    ? video?.url ?? video?.src ?? ""
    : video?.src ?? video?.url ?? "";

  return {
    type,
    src: type === "youtube" ? getYoutubeEmbedUrl(source) : source,
    title: video?.title ?? `Video ${index + 1} del proyecto`,
    poster: video?.poster ?? "",
  };
}

function ProjectVideos({ videos = [], title = "Videos del proyecto", className = "" }) {
  const sectionId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = useMemo(
    () => (Array.isArray(videos) ? videos : [])
      .map(normalizeVideo)
      .filter((video) => video.src),
    [videos],
  );

  if (items.length === 0) {
    return null;
  }

  const currentIndex = Math.min(activeIndex, items.length - 1);
  const activeVideo = items[currentIndex];
  const showPrevious = () => setActiveIndex((current) => (current - 1 + items.length) % items.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % items.length);

  return (
    <section className={className} aria-labelledby={sectionId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">Registro audiovisual</p>
          <h2 id={sectionId} className="mt-2 text-2xl font-bold tracking-tight text-[#0A2A4B] sm:text-3xl">
            {title}
          </h2>
        </div>
        <p className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? "video" : "videos"}
        </p>
      </div>

      <div
        className="mt-7 overflow-hidden rounded-2xl border border-[#0A2A4B]/10 bg-[#06192D] shadow-xl shadow-[#0A2A4B]/10"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Videos del proyecto"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${activeVideo.type}-${activeVideo.src}`}
            className="relative aspect-video bg-[#06192D]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.42, ease: EASE }}
          >
            {activeVideo.type === "youtube" ? (
              <iframe
                className="absolute inset-0 size-full"
                src={activeVideo.src}
                title={activeVideo.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video
                className="size-full object-contain"
                controls
                playsInline
                preload="metadata"
                poster={activeVideo.poster || undefined}
              >
                <source src={activeVideo.src} />
                Tu navegador no permite reproducir este video.
              </video>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-4 py-4 text-white sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-[#B9DCFF]" aria-hidden="true">
              <FaPlay className="ml-0.5 text-xs" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">{activeVideo.title}</p>
              {items.length > 1 && (
                <p className="mt-0.5 text-xs text-white/60" aria-live="polite">
                  Video {currentIndex + 1} de {items.length}
                </p>
              )}
            </div>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                className="grid size-10 place-items-center rounded-xl border border-white/15 text-white transition hover:-translate-y-0.5 hover:border-[#62A8EA]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62A8EA] active:translate-y-0 active:scale-95"
                aria-label="Ver video anterior"
              >
                <FaArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="grid size-10 place-items-center rounded-xl border border-white/15 text-white transition hover:-translate-y-0.5 hover:border-[#62A8EA]/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62A8EA] active:translate-y-0 active:scale-95"
                aria-label="Ver video siguiente"
              >
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="flex gap-1.5 px-4 pb-4 sm:px-5" aria-label="Seleccionar video">
            {items.map((video, index) => (
              <button
                key={`${video.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62A8EA] ${
                  index === currentIndex ? "w-8 bg-[#62A8EA]" : "w-3 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Ver ${video.title}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectVideos;
