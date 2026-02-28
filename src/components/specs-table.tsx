type SpecsTableProps = {
  specs: Array<{
    label: string;
    value: string;
  }>;
};

export function SpecsTable({ specs }: SpecsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
      {specs.map((spec, index) => (
        <div
          key={spec.label}
          className={`grid grid-cols-[0.9fr_1.1fr] gap-4 px-4 py-4 text-sm ${
            index !== specs.length - 1 ? "border-b border-[var(--border)]" : ""
          }`}
        >
          <span className="font-semibold text-[var(--foreground)]">{spec.label}</span>
          <span className="text-[var(--muted)]">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
