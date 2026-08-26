import { FaFilePdf } from "react-icons/fa";
import Button from "../ui/Button";

function ProductCard({ product }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-white shadow-[0_14px_34px_rgba(11,31,74,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#F4B400]/55 hover:shadow-[0_24px_52px_rgba(11,31,74,0.14)]">
      <span
        aria-hidden="true"
        className="absolute inset-x-8 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#F4B400]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-[#0B1F4A]/8 bg-[radial-gradient(circle_at_14%_16%,rgba(244,180,0,0.16),transparent_24%),linear-gradient(145deg,#f8fbff_0%,#e8f0f8_100%)] p-5 sm:p-7">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.075] [background-image:linear-gradient(rgba(11,31,74,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.8)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#15589D]/20 transition-transform duration-700 group-hover:scale-150"
        />
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain transition duration-700 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#15589D]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
          {product.category}
        </p>

        <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-[#0B1F4A] sm:text-2xl">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#52667B] sm:text-base sm:leading-7">
          {product.description}
        </p>

        <Button
          href={product.pdf}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
          className="mt-6 w-full border-[#0B1F4A]/15 hover:border-[#F4B400] hover:bg-[#0B1F4A] hover:shadow-[0_12px_24px_rgba(11,31,74,0.16)] sm:w-auto"
          aria-label={`Abrir ficha técnica de ${product.name}`}
        >
          <FaFilePdf aria-hidden="true" />
          Ver ficha técnica
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;
