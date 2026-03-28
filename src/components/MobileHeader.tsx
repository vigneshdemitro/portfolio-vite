import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { computeCareerYears } from '../lib/careerUtils';
import { ExperienceStats } from './ui/ExperienceStats';
import type { PortfolioProfile, TimelineMeta } from '../types';

interface MobileHeaderProps {
  portfolioProfile?: PortfolioProfile | null;
  meta?: TimelineMeta;
}

export function MobileHeader({ portfolioProfile, meta }: MobileHeaderProps) {
  const name      = portfolioProfile?.name              ?? 'Vigneshwar Pasupathi';
  const initials  = portfolioProfile?.initials           ?? 'VP';
  const photoUrl  = portfolioProfile?.avatarUrl          ?? '';
  const roles     = portfolioProfile?.roles              ?? [];
  const resumeUrl = portfolioProfile?.contact.resumeUrl  ?? '';

  const [imgSrc, setImgSrc] = useState('/Vignesh_sketch.png');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (photoUrl) {
      setImgSrc(photoUrl);
      setImgError(false);
    }
  }, [photoUrl]);

  const handleImgError = () => {
    if (imgSrc !== '/Vignesh_sketch.png') {
      setImgSrc('/Vignesh_sketch.png');
    } else {
      setImgError(true);
    }
  };

  const role = useTypewriter(roles);
  const { totalYears, softwareYears } = computeCareerYears(meta);

  return (
    <div className="lg:hidden sticky top-0 z-40" style={{ background: 'var(--bg)' }}>
      {/* Name / avatar row */}
      <div
        className="flex items-center px-4 py-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {!imgError ? (
            <img
              src={imgSrc}
              alt={name}
              onError={handleImgError}
              className="w-9 h-9 rounded-lg object-cover object-top shrink-0"
              style={{ border: '1px solid var(--border)' }}
            />
          ) : (
            <div
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid var(--border)' }}
            >
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <div className="text-sm font-bold leading-tight truncate" style={{ color: 'var(--text-primary)' }}>
              {name}
            </div>
            <div className="text-xs font-medium h-4 flex items-center" style={{ color: 'var(--accent)' }}>
              {role}<span className="cursor" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats + resume row */}
      {totalYears !== null && softwareYears !== null && (
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <ExperienceStats totalYears={totalYears} softwareYears={softwareYears} compact />

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest pb-0.5 shrink-0 transition-colors duration-200"
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
          )}
        </div>
      )}
    </div>
  );
}
