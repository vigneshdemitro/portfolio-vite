import { User, Code2, Briefcase, Mail } from 'lucide-react';
import type { SectionId } from '../types';

const items: { id: SectionId; label: string; Icon: React.ElementType }[] = [
  { id: 'about',      label: 'About',      Icon: User },
  { id: 'skills',     label: 'Skills',     Icon: Code2 },
  { id: 'experience', label: 'Exp',        Icon: Briefcase },
  { id: 'contact',    label: 'Contact',    Icon: Mail },
];

export function MobileNav({ activeSection }: { activeSection: SectionId }) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const isActive = activeSection === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-3 transition-colors duration-200"
            style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
          >
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            )}
            <Icon size={18} strokeWidth={isActive ? 2.5 : 1.75} />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
