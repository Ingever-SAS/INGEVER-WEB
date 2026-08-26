import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/cards/ProductCard";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { getBrandBySlug, getBrandProductCount } from "../data/catalog";
import Footer from "../sections/Footer";

function BrandPage() {
  const { brandId } = useParams();
  const brand = getBrandBySlug(brandId);

  useEffect(() => {
    document.title = brand
      ? `${brand.name} | Catálogo Ingever`
      : "Marca no encontrada | Ingever";
  }, [brand]);

  if (!brand) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center bg-[#F8F9FA] pt-24">
          <Container className="py-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#15589D]">Catálogo</p>
            <h1 className="mt-3 text-3xl font-bold text-[#0A2A4B] sm:text-4xl">
              Esta marca no está disponible
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Regresa a la sección de Catalogo para consultar las líneas comerciales actuales.
            </p>
            <Button to="/#productos" className="mt-7">
              Ver Catalogo
            </Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const productCount = getBrandProductCount(brand);

  return (
    <>
      <Navbar />
      <main>
        <section className="overflow-hidden bg-[#06192D] pb-14 pt-28 text-white sm:pb-20 sm:pt-36">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
              <div className="animate-[fadeUp_0.55s_ease-out] motion-reduce:animate-none">
                <a
                  href="/#productos"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-[#62A8EA] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15589D]/35"
                >
                  <FaArrowLeft aria-hidden="true" />
                  Volver a Catalogo
                </a>
                <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#B9DCFF]">Catálogo de marca</p>
                <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {brand.name}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  {brand.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold">
                    {productCount} {productCount === 1 ? "producto" : "productos"}
                  </span>
                  
                </div>
              </div>

              <div className="animate-[fadeUp_0.6s_ease-out_0.1s_backwards] rounded-3xl bg-white/10 p-6 backdrop-blur-sm motion-reduce:animate-none sm:p-8">
                <div className="aspect-4/3 overflow-hidden rounded-2xl bg-white p-5 sm:p-8">
                  <img
                    src={brand.image}
                    alt={brand.imageAlt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#F8F9FA] py-16 sm:py-20 lg:py-24">
          <Container>
            <SectionTitle
              subtitle={`${brand.name} · Productos`}
              title="Encuentra el equipo para tu operación"
              align="left"
            />

            <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
              {brand.categories.map((category) => (
                <section key={category.slug} aria-labelledby={`${brand.slug}-${category.slug}`}>
                  <div className="max-w-3xl border-l-4 border-[#15589D] pl-4 sm:pl-5">
                    <h2 id={`${brand.slug}-${category.slug}`} className="text-2xl font-bold text-[#0A2A4B] sm:text-3xl">
                      {category.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {category.products.map((product, index) => (
                      <div
                        key={product.id}
                        className="animate-[fadeUp_0.5s_ease-out_backwards] motion-reduce:animate-none"
                        style={{ animationDelay: `${index * 70}ms` }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default BrandPage;
