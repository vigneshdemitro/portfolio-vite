import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LeftPanel } from './components/LeftPanel';
import { ThemeToggle } from './components/ThemeToggle';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { BackToTop } from './components/ui/BackToTop';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';
import { getTimelineData, getPortfolioData } from './lib/api';
import type { Experience as ExperienceType } from './types';

export default function App() {
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection();

  const { data: timelineData } = useQuery({
    queryKey: ['timeline'],
    queryFn: getTimelineData,
    staleTime: 1000 * 60 * 10,
  });

  const { data: portfolioData } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolioData,
    staleTime: 1000 * 60 * 10,
  });

  // Derive experience list from timeline work entries (newest first)
  const experiences = useMemo<ExperienceType[]>(() => {
    if (!timelineData?.timeline) return [];
    return [...timelineData.timeline]
      .reverse()
      .filter(e => e.type === 'work')
      .map(e => ({
        companyName: e.organization ?? '',
        positions: (e.positions ?? []).map(p => ({
          title: p.title,
          startDate: p.startDate,
          endDate: p.endDate,
          description: p.description,
        })),
        skills: [],
      }));
  }, [timelineData]);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Aurora blobs (dark only) */}
      <div className="aurora" />

      {/* Theme toggle — fixed top right */}
      <div className="fixed top-4 right-5 z-50">
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>

      {/* ── Two-column layout ─────────────────────────── */}
      <div className="relative z-10 lg:flex lg:min-h-screen lg:max-w-6xl lg:mx-auto">

        {/* ── LEFT PANEL — fixed on desktop ─────────── */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:shrink-0">
          <LeftPanel
            activeSection={activeSection}
            meta={timelineData?.meta}
            portfolioProfile={portfolioData?.profile ?? null}
          />
        </div>

        {/* ── RIGHT PANEL — scrollable content ──────── */}
        <main className="lg:w-[58%] px-8 lg:px-14 py-16 lg:py-24">
          <About paragraphs={portfolioData?.about.paragraphs} />
          <Skills skills={portfolioData?.skills} />
          <Experience experiences={experiences} timelineUrl={portfolioData?.profile.contact.timeline} />
          <Contact contact={portfolioData?.profile.contact} />

        </main>
      </div>

      {/* Scroll to top — fixed bottom right */}
      <BackToTop />
    </div>
  );
}
