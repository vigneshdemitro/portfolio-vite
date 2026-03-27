interface SectionHeadingProps {
  label: string;
}

export function SectionHeading({ label }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
        {label}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  );
}
