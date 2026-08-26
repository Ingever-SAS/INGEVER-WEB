import { FaSearch } from "react-icons/fa";

function ProjectCatalogToolbar({
  query,
  activeService,
  order,
  services,
  onQueryChange,
  onServiceChange,
  onOrderChange,
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#0B1F4A]/10 bg-[#F6F8FC] p-4 shadow-[0_12px_30px_rgba(11,31,74,0.05)] sm:p-5">
      <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F4B400]/75 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#15589D]/8 blur-2xl" />

      <div className="relative">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block max-w-xl flex-1">
            <span className="sr-only">Buscar proyectos</span>
            <FaSearch aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1F4A]/55" />
            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Buscar por proyecto, ubicación o servicio"
              className="min-h-12 w-full rounded-xl border border-[#0B1F4A]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#0B1F4A] outline-none transition placeholder:text-[#0B1F4A]/35 focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/15 sm:text-base"
            />
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-[#0B1F4A]/15 bg-white px-4 text-sm font-semibold text-[#0B1F4A] shadow-sm sm:text-base">
            <span className="whitespace-nowrap text-[#0B1F4A]/55">Ordenar</span>
            <select
              value={order}
              onChange={(event) => onOrderChange(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-right outline-none"
            >
              <option value="default">Predeterminado</option>
              <option value="az">Nombre: A a Z</option>
            </select>
          </label>
        </div>

        {services.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filtrar proyectos por servicio">
            <button
              type="button"
              onClick={() => onServiceChange("")}
              aria-pressed={!activeService}
              className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25 ${
                !activeService
                  ? "border-[#F4B400]/65 bg-[#0B1F4A] text-white shadow-sm"
                  : "border-[#0B1F4A]/10 bg-white text-[#0B1F4A] hover:border-[#F4B400]/45 hover:bg-[#FFF9E8]"
              }`}
            >
              Todos
            </button>
            {services.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => onServiceChange(service)}
                aria-pressed={activeService === service}
                className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25 ${
                  activeService === service
                    ? "border-[#F4B400]/65 bg-[#0B1F4A] text-white shadow-sm"
                    : "border-[#0B1F4A]/10 bg-white text-[#0B1F4A] hover:border-[#F4B400]/45 hover:bg-[#FFF9E8]"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCatalogToolbar;
