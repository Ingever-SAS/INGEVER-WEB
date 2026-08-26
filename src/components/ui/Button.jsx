import { Link } from "react-router-dom";

const variants = {
  primary:
    "border border-[#15589D] bg-[#15589D] text-white shadow-lg shadow-[#0B1F4A]/20 hover:-translate-y-0.5 hover:border-[#F4B400] hover:bg-[#0F4E91] hover:shadow-xl hover:shadow-[#F4B400]/15 active:translate-y-0 active:scale-[0.98]",
  outline:
    "border border-[#0B1F4A]/20 bg-white text-[#0B1F4A] shadow-sm hover:-translate-y-0.5 hover:border-[#F4B400] hover:bg-[#0B1F4A] hover:text-white hover:shadow-lg hover:shadow-[#0B1F4A]/15 active:translate-y-0 active:scale-[0.98]",
  dark:
    "border border-[#0B1F4A] bg-[#0B1F4A] text-white shadow-lg shadow-[#0B1F4A]/20 hover:-translate-y-0.5 hover:border-[#F4B400] hover:bg-[#102b61] hover:shadow-xl active:translate-y-0 active:scale-[0.98]",
  light:
    "border border-white/50 bg-white/5 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-[#F4B400] hover:bg-white hover:text-[#0B1F4A] active:translate-y-0 active:scale-[0.98]",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base",
  lg: "min-h-12 px-6 py-3 text-base sm:px-7 sm:py-3.5 sm:text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  loadingLabel = "Cargando...",
  ...props
}) {
  const isDisabled = disabled || loading;
  const content = loading ? loadingLabel : children;
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F4B400]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} aria-busy={loading || undefined} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-busy={loading || undefined} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
