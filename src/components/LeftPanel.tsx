import { useState } from 'react';
import {
  Github,
  Linkedin,
  Milestone,
  ArrowUpRight,
} from "lucide-react";
import { NavLink } from "./NavLink";
import { ExperienceStats } from "./ui/ExperienceStats";
import { useTypewriter } from "../hooks/useTypewriter";
import { computeCareerYears } from "../lib/careerUtils";
import type {
  NavItem,
  SectionId,
  TimelineMeta,
  PortfolioProfile,
  Theme,
} from "../types";

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const iconBtnClass =
  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110";
const iconBtnStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  color: "var(--text-secondary)",
};

interface LeftPanelProps {
  activeSection: SectionId;
  meta?: TimelineMeta;
  portfolioProfile?: PortfolioProfile | null;
}

export function LeftPanel({
  activeSection,
  meta,
  portfolioProfile,
}: LeftPanelProps) {
  const name     = portfolioProfile?.name     ?? "Vigneshwar Pasupathi";
  const initials = portfolioProfile?.initials ?? "VP";
  const photoUrl = portfolioProfile?.avatarUrl ?? '';
  const tagline = portfolioProfile?.tagline ?? "";
  const roles = portfolioProfile?.roles ?? [];
  const github = portfolioProfile?.contact.github ?? "";
  const linkedin = portfolioProfile?.contact.linkedIn ?? "";
  const resumeUrl = portfolioProfile?.contact.resumeUrl ?? "";
  const timeline = portfolioProfile?.contact.timeline ?? "";

  const [imgSrc, setImgSrc] = useState(photoUrl || '/vignesh_sketch.png');
  const [imgError, setImgError] = useState(false);

  const handleImgError = () => {
    if (imgSrc !== 'vignesh_sketch.png') {
      setImgSrc('vignesh_sketch.png');
    } else {
      setImgError(true);
    }
  };
  const role = useTypewriter(roles);

  const { totalYears, softwareYears } = computeCareerYears(meta);

  return (
    <div className="h-full">

      {/* ── Desktop sidebar (lg+) ── */}
      <aside className="hidden lg:flex flex-col justify-between h-full py-16 px-14">
      {/* Top — identity */}
      <div>
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            {!imgError ? (
              <img
                src={imgSrc}
                alt={initials}
                onError={handleImgError}
                className="w-14 h-14 rounded-xl object-cover object-top shrink-0"
                style={{ border: '2px solid var(--border)' }}
              />
            ) : (
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-lg font-bold shrink-0"
                style={{
                  background: "var(--accent-glow)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <h1
                className="text-2xl font-bold tracking-tight mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {name}
              </h1>
              <p
                className="text-sm font-medium h-5"
                style={{ color: "var(--accent)" }}
              >
                {role}<span className="cursor" />
              </p>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {tagline}
          </p>
        </div>

        {/* Resume */}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-6 pb-0.5 transition-colors duration-200"
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

        {/* Nav */}
        <nav aria-label="Sections">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} active={activeSection} />
            ))}
          </ul>
        </nav>

        {/* Experience stats */}
        {totalYears !== null && softwareYears !== null && (
          <div className="mt-10">
            <ExperienceStats totalYears={totalYears} softwareYears={softwareYears} />
          </div>
        )}
      </div>

      {/* Bottom — socials */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={iconBtnClass}
              style={iconBtnStyle}
            >
              <Github size={15} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconBtnClass}
              style={iconBtnStyle}
            >
              <Linkedin size={15} />
            </a>
          )}
          <a
            href={timeline}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Career Timeline"
            title="Career Timeline"
            className={iconBtnClass}
            style={iconBtnStyle}
          >
            <Milestone size={15} />
          </a>
        </div>

        {name && (
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            Built by <span className="text-shimmer font-semibold">{name}</span>
            {' '}· Vite + React + Tailwind
          </p>
        )}
      </div>
      </aside>
    </div>
  );
}
