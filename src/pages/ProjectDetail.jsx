import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaClock,
  FaCogs,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectVideos from "../components/projects/ProjectVideos";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import ImageCarousel from "../components/ui/ImageCarousel";
import { getProjectBySlug, getProjectIndex, projects } from "../data/projects";
import Footer from "../sections/Footer";

const EASE = [0.22, 1, 0.36, 1];

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border-l border-white/20 pl-3 first:border-l-0 first:pl-0 sm:gap-4 sm:pl-4">
      <Icon aria-hidden="true" className="mt-1 shrink-0 text-[#62A8EA]" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">{label}</p>
        <p className="mt-1 text-sm font-semibold text-white sm:text-base">{value}</p>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { projectSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = getProjectBySlug(projectSlug);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = project
      ? `${project.title} | Proyectos Ingever`
      : "Proyecto no encontrado | Ingever";
  }, [project, projectSlug]);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center bg-[#F4F8FC] pt-24">
          <Container className="py-16 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#15589D]">Proyectos</p>
            <h1 className="mt-3 text-3xl font-bold text-[#0A2A4B] sm:text-4xl">
              Este proyecto no está disponible
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Regresa a nuestro portafolio para consultar los proyectos publicados.
            </p>
            <Button to="/#proyectos" className="mt-7">
              Ver todos los proyectos
            </Button>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const projectIndex = getProjectIndex(project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const projectGallery = Array.isArray(project.gallery) ? project.gallery : [];
  const projectVideos = Array.isArray(project.videos) ? project.videos : [];
  const projectServices = Array.isArray(project.services) ? project.services : [];
  const projectSpecifications = Array.isArray(project.specifications) ? project.specifications : [];
  const projectListReturn = location.state?.projectListReturn;
  const returnDepth = Number.isInteger(projectListReturn?.historyDepth)
    ? projectListReturn.historyDepth
    : 0;
  const linkedProjectState = returnDepth > 0
    ? {
      projectListReturn: {
        ...projectListReturn,
        historyDepth: returnDepth + 1,
      },
    }
    : undefined;
  const overviewSections = [
    { title: "El reto", content: project.challenges },
    { title: "La solución", content: project.solution },
    { title: "Resultados", content: project.results },
  ];
  const pageTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE };

  const returnToProjects = () => {
    if (returnDepth > 0) {
      navigate(-returnDepth);
      return;
    }

    navigate({ pathname: "/", hash: "#proyectos" });
  };

  return (
    <>
      <Navbar />
      <motion.main
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={pageTransition}
      >
        <section className="relative isolate overflow-hidden bg-[#06192D] pb-16 pt-28 text-white sm:pb-20 sm:pt-36 lg:pb-24">
          <img
            src={project.heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#06192D] via-[#0A2A4B]/90 to-[#0A2A4B]/65" />
          <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#15589D]/30 blur-3xl" />

          <Container>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.56, ease: EASE }}
              className="max-w-4xl"
            >
              <button
                type="button"
                onClick={returnToProjects}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-[#62A8EA] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#62A8EA]/35"
              >
                <FaArrowLeft aria-hidden="true" />
                Volver a proyectos
              </button>

              <p className="mt-9 text-xs font-bold uppercase tracking-[0.2em] text-[#62A8EA]">Proyecto destacado</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                {project.shortDescription}
              </p>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.12, duration: 0.52, ease: EASE }}
              className="mt-10 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
            >
              <MetaItem icon={FaMapMarkerAlt} label="Ubicación" value={project.location} />
              <MetaItem icon={FaBuilding} label="Cliente" value={project.client} />
              <MetaItem icon={FaCalendarAlt} label="Año" value={project.year} />
              <MetaItem icon={FaClock} label="Duración" value={project.duration} />
            </motion.div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">Descripción del proyecto</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0A2A4B] sm:text-4xl">
                Ingeniería enfocada en la operación
              </h2>
              <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                {project.fullDescription}
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-[#F4F8FC] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {overviewSections.map((section, index) => (
                <motion.article
                  key={section.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.48, delay: shouldReduceMotion ? 0 : index * 0.08, ease: EASE }}
                  className="rounded-2xl border border-[#0A2A4B]/8 bg-white p-6 shadow-sm sm:p-7"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">{section.title}</p>
                  <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{section.content}</p>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <ImageCarousel
              images={projectGallery}
              fallbackImage={project.heroImage}
              fallbackAlt={project.heroImageAlt}
              title="Galería del proyecto"
            />
          </Container>
        </section>

        <section className="bg-[#F4F8FC] py-16 sm:py-20 lg:py-24">
          <Container>
            <ProjectVideos videos={projectVideos} title="Videos del proyecto" />

            <div className={projectVideos.length > 0 ? "mt-16 sm:mt-20" : ""}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15589D]">Ficha técnica</p>
                  <h2 className="mt-3 text-3xl font-bold text-[#0A2A4B] sm:text-4xl">Especificaciones del proyecto</h2>
                </div>
                <FaCogs aria-hidden="true" className="hidden text-4xl text-[#15589D]/30 sm:block" />
              </div>

              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {projectSpecifications.map((specification) => (
                  <div key={specification.label} className="rounded-2xl border border-[#0A2A4B]/8 bg-white p-5 shadow-sm">
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#15589D]">{specification.label}</dt>
                    <dd className="mt-2 text-base font-bold leading-6 text-[#0A2A4B]">{specification.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="rounded-3xl border border-[#0A2A4B]/10 bg-[#06192D] px-6 py-8 text-white sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#62A8EA]">Servicios realizados</p>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Alcance de Ingever en este proyecto</h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                {projectServices.map((service) => (
                  <span key={service} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-t border-[#0A2A4B]/10 bg-[#F4F8FC] py-12 sm:py-16">
          <Container>
            <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
              {previousProject ? (
                <Button to={`/proyectos/${previousProject.slug}`} state={linkedProjectState} variant="outline" className="group min-h-24 justify-start px-5 text-left">
                  <FaArrowLeft aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15589D]">Proyecto anterior</span>
                    <span className="mt-1 block text-sm">{previousProject.title}</span>
                  </span>
                </Button>
              ) : (
                <div className="hidden rounded-xl border border-dashed border-[#0A2A4B]/15 md:block" aria-hidden="true" />
              )}

              <Button to="/#proyectos" className="min-h-14 self-center">
                Ver todos los proyectos
              </Button>

              {nextProject ? (
                <Button to={`/proyectos/${nextProject.slug}`} state={linkedProjectState} variant="outline" className="group min-h-24 justify-end px-5 text-right">
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#15589D]">Proyecto siguiente</span>
                    <span className="mt-1 block text-sm">{nextProject.title}</span>
                  </span>
                  <FaArrowRight aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              ) : (
                <div className="hidden rounded-xl border border-dashed border-[#0A2A4B]/15 md:block" aria-hidden="true" />
              )}
            </div>
          </Container>
        </section>
      </motion.main>
      <Footer />
    </>
  );
}

export default ProjectDetail;
