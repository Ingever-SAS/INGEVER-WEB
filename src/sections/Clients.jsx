import ClientLogoCard from "../components/cards/ClientLogoCard";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { clients } from "../data/clients";

function Clients() {
  return (
    <section id="proveedores" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle subtitle="Proveedores" title="Alianzas que fortalecen nuestra operación" />

        <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-[#0B1F4A]/70 sm:mt-6 sm:text-lg sm:leading-8">
          A lo largo de nuestra trayectoria hemos trabajado con proveedores de distintos
          sectores que nos permiten ofrecer soluciones de izaje confiables y de calidad.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-4 sm:gap-5">
          {clients.map((client, index) => (
            <ClientLogoCard key={client.id} {...client} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Clients;
