import ServiceCard from "../components/cards/ServiceCard";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { services } from "../data/services";

function Services() {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045] [background-image:linear-gradient(rgba(11,31,74,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,74,0.7)_1px,transparent_1px)] [background-size:54px_54px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-72 w-72 rounded-full bg-[#15589D]/10 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl sm:h-96 sm:w-96"
      />

      <Container className="relative z-10">
        <SectionTitle subtitle="Servicios" title="Soluciones que sostienen tu operación" />

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-[#496078] sm:mt-6 sm:text-lg sm:leading-8">
          Ofrecemos soluciones integrales para puentes grúa, desde su instalación
          hasta su modernización, con seguridad, eficiencia y confiabilidad en
          cada proyecto.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Services;
