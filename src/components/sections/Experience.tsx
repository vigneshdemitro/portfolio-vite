import { ExternalLink, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TimelineEntry } from '../ui/TimelineEntry';
import type { Experience as ExperienceType } from '../../types';

interface ExperienceProps {
  experiences?: ExperienceType[];
  timelineUrl?: string;
}

export function Experience({ experiences = [], timelineUrl = '' }: ExperienceProps) {
  return (
    <section id="experience" className="mb-24 scroll-mt-16">
      <SectionHeading label="Experience" />

      {/* Timeline entries */}
      <div className="relative">
        {/* Spine line */}
        <div className="timeline-spine" />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.companyName} delay={i * 100}>
              <TimelineEntry experience={exp} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Full timeline CTA */}
      <ScrollReveal delay={300}>
        <a
          href={timelineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between mt-10 glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
          style={{
            borderColor: 'var(--accent)',
            background: 'var(--accent-glow)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px var(--accent-glow)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ExternalLink size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                Interactive Timeline
              </span>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Explore the full career journey with dates, milestones &amp; promotions
            </p>
          </div>
          <ArrowRight
            size={20}
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: 'var(--accent)' }}
          />
        </a>
      </ScrollReveal>
    </section>
  );
}
