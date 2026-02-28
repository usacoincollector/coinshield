type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2"
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className="max-w-3xl">
      <p className="font-[family-name:var(--font-serif)] text-sm uppercase tracking-[0.32em] text-[var(--accent-strong)]">
        {eyebrow}
      </p>
      <HeadingTag className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">{description}</p>
      ) : null}
    </div>
  );
}
