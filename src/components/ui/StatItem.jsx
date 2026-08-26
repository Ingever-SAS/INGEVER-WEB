function StatItem({ value, label, tone = "light", className = "" }) {
  const toneStyles = {
    light: "text-[#0B1F4A]",
    dark: "text-white",
    accent: "text-[#0B1F4A]",
  };

  const labelStyles = {
    light: "text-[#0B1F4A]/70",
    dark: "text-white/70",
    accent: "text-[#0B1F4A]/70",
  };

  return (
    <div className={className}>
      <p
        className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
          toneStyles[tone] ?? toneStyles.light
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-1 text-xs font-medium sm:text-sm ${
          labelStyles[tone] ?? labelStyles.light
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default StatItem;
