import { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SkillBar } from '../ui/SkillBar';
import type { Skill } from '../../types';

const skillTabs = ['All', 'Language', 'Backend', 'Frontend', 'Cloud'] as const;
type SkillTab = typeof skillTabs[number];

interface SkillsProps {
  skills?: Skill[];
}

export function Skills({ skills = [] }: SkillsProps) {
  const [activeTab, setActiveTab] = useState<SkillTab>('All');

  const filtered = activeTab === 'All'
    ? skills
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="mb-24 scroll-mt-16">
      <SectionHeading label="Skills" />

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {skillTabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 capitalize"
              style={{
                background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                color: isActive ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Skill bars */}
      <div className="space-y-5">
        {filtered.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}
