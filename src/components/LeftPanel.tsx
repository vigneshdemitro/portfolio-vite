import { NavLink } from "./NavLink";
import { ExperienceStats } from "./ui/ExperienceStats";
import { Avatar } from "./ui/Avatar";
import { ResumeLink } from "./ui/ResumeLink";
import { useProfileData } from "../hooks/useProfileData";
import { computeCareerYears } from "../lib/careerUtils";
import type { NavItem, SectionId, TimelineMeta } from "../types";

const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

interface LeftPanelProps {
  activeSection: SectionId;
  meta?: TimelineMeta;
}

export function LeftPanel({ activeSection, meta }: LeftPanelProps) {
  const { resumeUrl } = useProfileData();
  const { totalYears, softwareYears } = computeCareerYears(meta);

  return (
    <div className="h-full">
      <aside className="hidden lg:flex flex-col justify-between h-full py-16 px-14">
        <div>
          <div className="mb-10">
            <Avatar />
          </div>

          {/* Resume */}
          {resumeUrl && <ResumeLink href={resumeUrl} className="mb-6" />}

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
      </aside>
    </div>
  );
}
