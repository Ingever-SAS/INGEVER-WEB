function SectionTitle({ subtitle, title, align = "center", className = "" }) {
  const isCentered = align === "center";
  const alignment = isCentered ? "text-center" : "text-left";

  return (
    <div className={`${alignment} ${className}`}>
      {subtitle && (
        <div
          className={`mb-4 flex items-center gap-3 ${isCentered ? "justify-center" : "justify-start"
            }`}
        >
          {isCentered && (
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[#F4B400]"
            />
          )}

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B1F4A] sm:text-sm">
            {subtitle}
          </p>

          {isCentered && (
            <span
              aria-hidden="true"
              className="h-px w-10 bg-[#F4B400]"
            />
          )}
        </div>
      )}

      <h2 className={`text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#0B1F4A] sm:text-4xl lg:text-5xl ${isCentered ? "mx-auto max-w-3xl" : "max-w-4xl"}`}>
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
