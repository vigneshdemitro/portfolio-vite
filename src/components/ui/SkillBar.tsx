import { useEffect, useRef, useState } from 'react';
import type { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
  delay?: number;
}

const nameToIcon: Record<string, string> = {
  'TypeScript': 'ts',
  'Node.js':    'node',
  'Python':     'py',
  'React':      'react',
  'Angular':    'ng',
  'NestJS':     'nest',
  'PostgreSQL': 'pg',
  'AWS':        'aws',
  'Teamcity':   'ci',
};

const iconColors: Record<string, string> = {
  ts:    'bg-blue-500/10 text-blue-400',
  node:  'bg-green-500/10 text-green-400',
  py:    'bg-yellow-500/10 text-yellow-400',
  react: 'bg-cyan-500/10 text-cyan-400',
  ng:    'bg-red-500/10 text-red-400',
  nest:  'bg-red-500/10 text-red-400',
  pg:    'bg-sky-500/10 text-sky-400',
  aws:   'bg-orange-500/10 text-orange-400',
  ci:    'bg-slate-500/10 text-slate-400',
};

const iconLabels: Record<string, string> = {
  ts:    'ts',
  js:    'js',
  node:  'node',
  py:    'py',
  react: 'react',
  ng:    'ng',
  nest:  'nest',
  pg:    'pg',
  aws:   'aws',
  ci:    'ci',
};

export function SkillBar({ skill, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const iconKey = skill.icon ?? nameToIcon[skill.name] ?? '';
  const colorClass = iconColors[iconKey] ?? 'bg-slate-500/10 text-slate-400';
  const iconLabel = iconLabels[iconKey] ?? skill.name.slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${colorClass}`}>
        {iconLabel}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {skill.level}%
          </span>
        </div>
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{ width: animated ? `${skill.level}%` : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}
