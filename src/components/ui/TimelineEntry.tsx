import type { Experience } from '../../types';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present';
  // Support both "YYYY-MM" (timeline.json) and "MM/YYYY" (legacy)
  const [a, b] = dateStr.includes('-') ? dateStr.split('-') : dateStr.split('/').reverse();
  return new Date(parseInt(a), parseInt(b) - 1).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

interface TimelineEntryProps {
  experience: Experience;
}

export function TimelineEntry({ experience }: TimelineEntryProps) {
  const latestPosition = experience.positions[0];
  const earliestPosition = experience.positions[experience.positions.length - 1];

  const dateRange = `${formatDate(earliestPosition.startDate)} — ${formatDate(latestPosition.endDate)}`;

  return (
    <div className="relative pl-6 group">
      {/* Spine dot */}
      <div
        className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${latestPosition.endDate === null ? 'dot-active' : ''}`}
        style={{
          background: latestPosition.endDate === null ? 'var(--accent)' : 'var(--bg)',
          borderColor: 'var(--accent)',
        }}
      />

      {/* Card */}
      <div
        className="glass rounded-xl p-5 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 cursor-default"
        style={{ boxShadow: '0 0 0 0 var(--accent-glow)' }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px var(--accent-glow)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 var(--accent-glow)';
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
              {experience.positions.length > 1
                ? experience.positions.map(p => p.title).join(' → ')
                : latestPosition.title}
            </h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent)' }}>
              {experience.companyName}
            </p>
          </div>
          <span
            className="text-xs font-mono shrink-0 mt-0.5"
            style={{ color: 'var(--text-muted)' }}
          >
            {dateRange}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
          {latestPosition.description}
        </p>

        {experience.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {experience.skills.map(skill => (
              <span key={skill} className="skill-pill text-xs px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
