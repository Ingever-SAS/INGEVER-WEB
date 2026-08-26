import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getBrandProductCount } from "../../data/catalog";
import Button from "../ui/Button";

function pickRandomLogoImage(brand) {
  const pool =
    Array.isArray(brand.logoImages) && brand.logoImages.length > 0
      ? brand.logoImages
      : [{ src: brand.image, alt: brand.imageAlt }];

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

const EASE = [0.22, 1, 0.36, 1];

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: EASE },
  },
};

function BrandCard({ brand, reduceMotion = false }) {
  const productCount = getBrandProductCount(brand);
  const logoImage = useMemo(() => pickRandomLogoImage(brand), [brand]);

  return (
    <article className="group grid overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-white shadow-[0_14px_34px_rgba(11,31,74,0.07)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.64, ease: EASE }}
        className="relative isolate aspect-[4/3] min-h-56 overflow-hidden border-b border-[#0B1F4A]/8 bg-[radial-gradient(circle_at_14%_16%,rgba(244,180,0,0.18),transparent_24%),linear-gradient(145deg,#f8fbff_0%,#e8f0f8_100%)] p-6 sm:min-h-80 sm:p-10 md:aspect-auto md:border-b-0 md:border-r"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(11,31,74,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.8)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[18px] border-[#15589D]/18 transition-transform duration-700 group-hover:scale-110" />
        <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/80 to-transparent" />
        <img
          src={logoImage.src}
          alt={logoImage.alt}
          className="relative h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.div>

      <motion.div
        variants={contentVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="flex flex-col items-start p-6 sm:p-8 lg:p-10"
      >
        <motion.p variants={contentItemVariants} className="text-xs font-bold uppercase tracking-[0.18em] text-[#0B1F4A]">
          Marca industrial
        </motion.p>
        <motion.h3 variants={contentItemVariants} className="mt-3 text-3xl font-bold tracking-tight text-[#0B1F4A] sm:text-4xl">
          {brand.name}
        </motion.h3>
        <motion.p variants={contentItemVariants} className="mt-4 max-w-xl text-base leading-7 text-[#52667B] sm:text-lg sm:leading-8">
          {brand.shortDescription}
        </motion.p>

        <motion.p variants={contentItemVariants} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/35 bg-[#FFF9E8] px-4 py-2 text-sm font-bold text-[#0B1F4A]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
          {productCount} {productCount === 1 ? "producto" : "productos"}
        </motion.p>

        <motion.div variants={contentItemVariants} className="mt-7 w-full sm:w-auto">
          <Button
            to={`/marcas/${brand.slug}`}
            className="group/button w-full sm:w-auto"
            aria-label={`Ver productos ${brand.name}`}
          >
            Ver productos
            <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover/button:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </article>
  );
}

export default BrandCard;
