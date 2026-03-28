interface ExperienceStatsProps {
  totalYears: number;
  softwareYears: number;
  compact?: boolean;
}

export function ExperienceStats({ totalYears, softwareYears, compact = false }: ExperienceStatsProps) {
  const numClass = compact ? 'text-2xl font-bold leading-none mb-0.5' : 'text-4xl font-bold leading-none mb-1';
  const labelClass = compact ? 'text-[10px] uppercase tracking-widest' : 'text-xs uppercase tracking-widest';

  return (
    <div className={`flex items-center ${compact ? 'gap-5' : 'gap-8'}`}>
      <div>
        <div
          className={numClass}
          style={{
            background: 'linear-gradient(135deg, var(--accent), #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {totalYears}+
        </div>
        <div className={labelClass} style={{ color: 'var(--text-muted)' }}>
          Years<br />Experience
        </div>
      </div>

      <div className={`w-px self-stretch ${compact ? 'my-0.5' : 'h-10 self-center'}`} style={{ background: 'var(--border)' }} />

      <div>
        <div
          className={numClass}
          style={{
            background: 'linear-gradient(135deg, #38bdf8, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {softwareYears}+
        </div>
        <div className={labelClass} style={{ color: 'var(--text-muted)' }}>
          Years in<br />Software
        </div>
      </div>
    </div>
  );
}
