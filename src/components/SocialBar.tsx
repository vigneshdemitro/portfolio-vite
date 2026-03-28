import { Github, Linkedin, Milestone } from 'lucide-react';
import type { PortfolioContact, Theme } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { ICON_BTN_CLASS, ICON_BTN_STYLE } from '../lib/styles';

interface SocialBarProps {
  contact?: PortfolioContact,
  theme: Theme,
  onToggleTheme: () => void,
}

export function SocialBar({ contact, theme, onToggleTheme }: SocialBarProps) {
  if (!contact) return null;
  const { github, linkedIn, timeline } = contact;

  return (
    <div className="fixed right-3 top-1/3 -translate-y-1/3 z-40 flex flex-col gap-2">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className={ICON_BTN_CLASS} style={ICON_BTN_STYLE}>
          <Github size={14} />
        </a>
      )}
      {linkedIn && (
        <a href={linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className={ICON_BTN_CLASS} style={ICON_BTN_STYLE}>
          <Linkedin size={14} />
        </a>
      )}
      {timeline && (
        <a href={timeline} target="_blank" rel="noopener noreferrer" aria-label="Career Timeline"
          className={ICON_BTN_CLASS} style={ICON_BTN_STYLE}>
          <Milestone size={14} />
        </a>
      )}
    </div>
  );
}
