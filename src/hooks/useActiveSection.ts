import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

const SECTIONS: SectionId[] = ['about', 'skills', 'experience', 'contact'];

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('about');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return active;
}
