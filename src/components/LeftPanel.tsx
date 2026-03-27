import { useState } from 'react';
import {
  Github,
  Linkedin,
  FileDown,
  Milestone,
  ArrowUpRight,
} from "lucide-react";
import { NavLink } from "./NavLink";
import { useTypewriter } from "../hooks/useTypewriter";
import type {
  NavItem,
  SectionId,
  TimelineMeta,
  PortfolioProfile,
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

  const [imgError, setImgError] = useState(false);
  const role = useTypewriter(roles);

  const currentYear = new Date().getFullYear();
  const totalYears = meta ? currentYear - meta.careerStartYear : null;
  const softwareYears = meta
    ? currentYear - meta.softwareCareerStartYear
    : null;

  return (
    <aside className="flex flex-col justify-between h-full py-16 px-10 lg:px-14">
      {/* Top — identity */}
      <div>
        <div className="mb-10">
          {photoUrl && !imgError ? (
            <img
              src={photoUrl}
              alt={name}
              onError={() => setImgError(true)}
              className="w-14 h-14 rounded-xl object-cover mb-6"
              style={{ border: '2px solid var(--border)' }}
            />
          ) : (
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-lg font-bold mb-6"
              style={{
                background: "var(--accent-glow)",
                color: "var(--accent)",
                border: "1px solid var(--border)",
              }}
            >
              {initials}
            </div>
          )}
          <h1
            className="text-3xl font-bold tracking-tight mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </h1>
          <p
            className="text-sm font-medium mb-4 h-5"
            style={{ color: "var(--accent)" }}
          >
            {role}
            <span className="cursor" />
          </p>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            {tagline}
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Sections">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.id} item={item} active={activeSection} />
            ))}
          </ul>
        </nav>

        {/* Experience stats — like timeline, no borders */}
        {totalYears !== null && softwareYears !== null && (
          <div className="flex items-center gap-8 mt-10">
            <div>
              <div
                className="text-4xl font-bold leading-none mb-1"
                style={{
                  background: "linear-gradient(135deg, var(--accent), #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {totalYears}+
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Years
                <br />
                Experience
              </div>
            </div>

            <div
              className="w-px h-10 self-center"
              style={{ background: "var(--border)" }}
            />

            <div>
              <div
                className="text-4xl font-bold leading-none mb-1"
                style={{
                  background: "linear-gradient(135deg, #38bdf8, #c084fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {softwareYears}+
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Years in
                <br />
                Software
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom — socials + resume */}
      <div className="space-y-3">
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--accent)';
              el.style.color = 'var(--accent)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'var(--border)';
              el.style.color = 'var(--text-secondary)';
            }}
          >
            <FileDown size={12} className="shrink-0 transition-transform duration-200 group-hover:translate-y-0.5" />
            <div className="text-left">
              <div>Resume</div>
              <div className="font-normal opacity-60 text-[10px] leading-tight">View / Download</div>
            </div>
            <ArrowUpRight size={11} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
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
  );
}
