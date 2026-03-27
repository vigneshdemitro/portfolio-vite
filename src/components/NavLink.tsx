import type { NavItem, SectionId } from '../types';

interface NavLinkProps {
  item: NavItem;
  active: SectionId;
}

export function NavLink({ item, active }: NavLinkProps) {
  const isActive = active === item.id;

  return (
    <li>
      <a
        href={`#${item.id}`}
        className={`nav-item flex items-center gap-4 py-1 group ${isActive ? 'active' : ''}`}
      >
        <span className="nav-indicator" />
        <span
          className="nav-label text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
          style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}
        >
          {item.label}
        </span>
      </a>
    </li>
  );
}
