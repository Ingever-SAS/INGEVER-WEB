import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { brands } from "../data/catalog";

function BrandsStrip() {
  // Mostramos hasta 5 marcas ya registradas en el catálogo, sin autoplay ni carrusel.
  const visibleBrands = brands.slice(0, 5);

  return (
    <section
      id="marcas"
      className="relative isolate overflow-hidden bg-[#0B1F4A] py-14 text-white sm:py-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:46px_46px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-[#15589D]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-[#F4B400]/10 blur-3xl"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <SectionTitle
            subtitle="Marcas que comercializamos"
            title="Líneas industriales de confianza"
            align="left"
            className="max-w-xl"
          />
          <p className="max-w-md text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
            Polipastos, winches y sistemas de control para operaciones de izaje
            con respaldo técnico y repuestos originales.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {visibleBrands.map((brand) => (
            <li
              key={brand.slug}
              className="group flex h-24 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F4B400]/55 hover:bg-white/[0.09] sm:h-28 sm:px-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80 transition-colors duration-300 group-hover:text-[#F4B400] sm:text-sm">
                {brand.name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default BrandsStrip;
