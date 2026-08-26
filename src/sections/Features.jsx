import FeatureCard from "../components/cards/FeatureCard";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { features } from "../data/features";

function Features() {
  return (
    <section id="fortalezas" className="relative overflow-hidden bg-[#F6F8FC] py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(11,31,74,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.8)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#15589D]/10 blur-3xl" />

      <Container className="relative z-10">
        <SectionTitle
          subtitle="Nuestro enfoque"
          title="Confiabilidad que se nota en cada maniobra"
        />

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-[#0B1F4A]/70 sm:mt-6 sm:text-lg sm:leading-8">
          Nuestra experiencia, compromiso y enfoque en la seguridad nos permiten
          ofrecer soluciones confiables para cada proyecto industrial.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;
