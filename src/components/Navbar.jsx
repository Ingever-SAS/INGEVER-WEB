import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navigation } from "../data/navigation";
import Logo, { Logo2 } from "./Logo";
import Button from "./ui/Button";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuoteCta, setShowQuoteCta] = useState(false);
  const solidHeader = scrolled || menuOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const heroQuoteCta = document.getElementById("hero-quote-cta");

    if (!heroQuoteCta || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowQuoteCta(!entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(heroQuoteCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const linkColor = solidHeader ? "text-[#0B1F4A]" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out ${
        solidHeader
          ? "border-[#0B1F4A]/10 bg-white/95 py-3 shadow-xl shadow-[#0B1F4A]/10 backdrop-blur-xl"
          : "border-transparent bg-gradient-to-b from-[#0B1F4A]/60 to-transparent py-4 sm:py-5"
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 xl:px-10">
        <a href="/#inicio" aria-label="Ir al inicio" onClick={closeMenu} className="shrink-0">
          {solidHeader ? (
            <Logo className="h-16 w-auto sm:h-[4.75rem]" />
          ) : (
            <Logo2 className="h-16 w-auto sm:h-[4.75rem] lg:h-[5.5rem]" />
          )}
        </a>

        <div className="hidden items-center gap-6 xl:flex">
          <ul className={`flex items-center gap-6 text-sm font-semibold ${linkColor}`}>
            {navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative py-2 transition-colors hover:text-[#F4B400] focus-visible:text-[#F4B400] focus-visible:outline-none after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#F4B400] after:transition-all hover:after:w-full focus-visible:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {showQuoteCta && (
            <Button
              to="/contacto"
              size="sm"
              className="animate-[navCtaIn_0.4s_ease-out_backwards] motion-reduce:animate-none"
            >
              Solicitar cotización
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          {showQuoteCta && (
            <Button
              to="/contacto"
              size="sm"
              className="animate-[navCtaIn_0.4s_ease-out_backwards] motion-reduce:animate-none"
            >
              Cotizar
            </Button>
          )}

          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/25 ${
              solidHeader
                ? "border-[#0B1F4A]/10 text-[#0B1F4A] hover:border-[#F4B400] hover:bg-[#FFF9E8]"
                : "border-white/20 bg-white/10 text-white backdrop-blur-sm hover:border-[#F4B400]/70 hover:bg-white/20"
            }`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls="menu-principal"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-base" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="menu-principal"
            className="absolute left-5 right-5 top-full mt-3 rounded-2xl border border-[#0B1F4A]/10 bg-white/98 p-3 shadow-2xl shadow-[#0B1F4A]/15 backdrop-blur-xl xl:hidden"
          >
            <ul className="space-y-1">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#0B1F4A] transition-colors hover:bg-[#FFF9E8] hover:text-[#0B1F4A]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
