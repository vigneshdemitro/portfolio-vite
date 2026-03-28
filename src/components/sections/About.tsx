import { ScrollReveal } from "../ui/ScrollReveal";
import { SectionHeading } from "../ui/SectionHeading";
import { computeCareerYears } from "../../lib/careerUtils";
import type { TimelineMeta } from "../../types";

interface AboutProps {
  paragraphs?: string[];
  meta?: TimelineMeta;
}

export function About({ paragraphs = [], meta }: AboutProps) {
  const { totalYears, softwareYears } = computeCareerYears(meta);

  const resolved = paragraphs.map(p =>
    p
      .replace('{{totalYears}}',    totalYears    !== null ? String(totalYears)    : '')
      .replace('{{softwareYears}}', softwareYears !== null ? String(softwareYears) : '')
  );

  return (
    <section id="about" className="mb-24 scroll-mt-16">
      <SectionHeading label="About" />

      <div className="space-y-4 mb-10">
        {resolved.map((para, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <p
              className="text-sm leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              {para}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
