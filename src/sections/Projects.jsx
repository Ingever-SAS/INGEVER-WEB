import { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProjectCard from "../components/cards/ProjectCard";
import ProjectCatalogToolbar from "../components/projects/ProjectCatalogToolbar";
import Container from "../components/ui/Container";
import SectionTitle from "../components/ui/SectionTitle";
import { projects } from "../data/projects";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function Projects() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const activeService = searchParams.get("servicio") ?? "";
  const order = searchParams.get("orden") ?? "default";

  const availableServices = useMemo(
    () => [...new Set(projects.flatMap((project) => project.services ?? []))],
    [],
  );

  const visibleProjects = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    const filteredProjects = projects.filter((project) => {
      const matchesService = !activeService || project.services?.includes(activeService);
      const searchableProject = [
        project.title,
        project.location,
        project.shortDescription,
        ...(project.services ?? []),
      ].join(" ");
      const matchesQuery = !normalizedQuery || normalizeText(searchableProject).includes(normalizedQuery);

      return matchesService && matchesQuery;
    });

    return order === "az"
      ? [...filteredProjects].sort((first, second) => first.title.localeCompare(second.title, "es"))
      : filteredProjects;
  }, [activeService, order, query]);

  const updateCatalogState = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "default") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    const nextSearch = nextParams.toString();
    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
        hash: location.hash,
      },
      { replace: true, preventScrollReset: true },
    );
  };

  return (
    <section id="proyectos" className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#15589D]/8 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-16 h-px w-1/4 bg-gradient-to-r from-[#F4B400]/70 to-transparent" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle subtitle="Proyectos" title="Ingeniería aplicada en cada operación" align="left" />
          <p className="max-w-xl text-base leading-7 text-[#0B1F4A]/70 lg:text-right">
            Explora algunos proyectos que reflejan nuestra experiencia en montaje,
            mantenimiento y modernización de sistemas de izaje.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <ProjectCatalogToolbar
            query={query}
            activeService={activeService}
            order={order}
            services={availableServices}
            onQueryChange={(value) => updateCatalogState({ q: value })}
            onServiceChange={(value) => updateCatalogState({ servicio: value })}
            onOrderChange={(value) => updateCatalogState({ orden: value })}
          />
        </div>

        <p className="mt-5 text-sm font-medium text-[#0B1F4A]/55" aria-live="polite">
          {visibleProjects.length} {visibleProjects.length === 1 ? "proyecto encontrado" : "proyectos encontrados"}
        </p>

        {visibleProjects.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-8 lg:grid-cols-3 lg:gap-8">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-[#0B1F4A]/20 bg-[#F6F8FC] px-6 py-12 text-center">
            <p className="text-lg font-bold text-[#0B1F4A]">No encontramos proyectos con esos criterios.</p>
            <button
              type="button"
              onClick={() => updateCatalogState({ q: "", servicio: "", orden: "default" })}
              className="mt-3 font-semibold text-[#0B1F4A] transition hover:text-[#15589D] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25"
            >
              Limpiar búsqueda y filtros
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Projects;
