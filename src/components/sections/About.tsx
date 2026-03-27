import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';

interface AboutProps {
  paragraphs?: string[];
}

export function About({ paragraphs = [] }: AboutProps) {
  return (
    <section id="about" className="mb-24 scroll-mt-16">
      <SectionHeading label="About" />

      <div className="space-y-4 mb-10">
        {paragraphs.map((para, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
              {para}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
