import { ArrowUpRight } from 'lucide-react';

interface ResumeLinkProps {
  href: string;
  className?: string;
}

export function ResumeLink({ href, className = '' }: ResumeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest pb-0.5 transition-colors duration-200 ${className}`}
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
    >
      Resume
      <ArrowUpRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--accent)' }} />
      <span
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
        style={{ background: 'var(--accent)' }}
      />
    </a>
  );
}
