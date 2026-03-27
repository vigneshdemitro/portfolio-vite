import { Github, Linkedin, Milestone } from 'lucide-react';
import type { PortfolioContact } from '../types';

const btnClass =
  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110';
const btnStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--text-secondary)',
};

export function MobileSocials({ contact }: { contact?: PortfolioContact }) {
  if (!contact) return null;
  const { github, linkedIn, timeline } = contact;

  return (
    <div className="lg:hidden fixed right-3 top-1/4 -translate-y-1/4 z-40 flex flex-col gap-2">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className={btnClass} style={btnStyle}>
          <Github size={14} />
        </a>
      )}
      {linkedIn && (
        <a href={linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className={btnClass} style={btnStyle}>
          <Linkedin size={14} />
        </a>
      )}
      {timeline && (
        <a href={timeline} target="_blank" rel="noopener noreferrer" aria-label="Career Timeline"
          className={btnClass} style={btnStyle}>
          <Milestone size={14} />
        </a>
      )}
    </div>
  );
}
