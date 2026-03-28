import { computeCareerYears } from '../lib/careerUtils';
import { ExperienceStats } from './ui/ExperienceStats';
import { Avatar } from './ui/Avatar';
import { ResumeLink } from './ui/ResumeLink';
import { useProfileData } from '../hooks/useProfileData';
import type { TimelineMeta } from '../types';

interface MobileHeaderProps {
  meta?: TimelineMeta;
}

export function MobileHeader({ meta }: MobileHeaderProps) {
  const { resumeUrl } = useProfileData();
  const { totalYears, softwareYears } = computeCareerYears(meta);

  return (
    <div className="lg:hidden sticky top-0 z-40" style={{ background: 'var(--bg)' }}>
      {/* Identity row */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <Avatar size="sm" />
      </div>

      {/* Stats + resume row */}
      {totalYears !== null && softwareYears !== null && (
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <ExperienceStats totalYears={totalYears} softwareYears={softwareYears} compact />
          {resumeUrl && <ResumeLink href={resumeUrl} className="shrink-0" />}
        </div>
      )}
    </div>
  );
}
