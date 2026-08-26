function IconBadge({ icon: Icon, className = "", size = "md" }) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-14 w-14 sm:h-16 sm:w-16",
    lg: "h-16 w-16 sm:h-20 sm:w-20",
  };

  const iconSizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
  };

  return (
    <div
      className={`relative grid place-items-center rounded-2xl border border-[#15589D]/20 bg-[#0B1F4A] text-white shadow-[0_12px_24px_rgba(11,31,74,0.18)] transition-all duration-500 group-hover:border-[#F4B400]/70 group-hover:bg-[#123A77] group-hover:shadow-[0_14px_28px_rgba(11,31,74,0.28)] ${
        sizes[size] ?? sizes.md
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-[#F4B400]"
      />
      {Icon ? <Icon className={`${iconSizes[size] ?? iconSizes.md}`} aria-hidden="true" /> : null}
    </div>
  );
}

export default IconBadge;
