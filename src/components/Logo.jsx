import navbarIsotype from "../assets/logo/logo.png";
import logo2 from "../assets/logo/logo2.png";
import logo3 from "../assets/logo/logo3.png";

function Logo({ className = "" }) {
  return (
    <img
      src={navbarIsotype}
      alt="Ingever Asociados"
      className={`w-auto transition-all duration-500 ease-out hover:scale-[1.09] ${className}`}
    />
  );
}

export function Logo2({ className = "" }) {
  return (
    <img
      src={logo2}
      alt="Ingever Asociados"
      className={`w-auto transition-all duration-500 ease-out hover:scale-[1.03] ${className}`}
    />
  );
}

export function Logo3({ className = "" }) {
  return (
    <img
      src={logo3}
      alt="Ingever Asociados"
      className={`w-auto transition-all duration-500 ease-out hover:scale-[1.03] ${className}`}
    />
  );
}

export default Logo;
