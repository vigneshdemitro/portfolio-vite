import type { TimelineMeta } from '../types';

export function computeCareerYears(meta?: TimelineMeta) {
  const currentYear = new Date().getFullYear();
  return {
    totalYears: meta ? currentYear - meta.careerStartYear : null,
    softwareYears: meta ? currentYear - meta.softwareCareerStartYear : null,
  };
}
