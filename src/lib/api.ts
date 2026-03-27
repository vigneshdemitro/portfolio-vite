import type { PortfolioData, TimelineData } from '../types';

const BASE = 'https://raw.githubusercontent.com/vigneshdemitro/portfolio-data/main';

const PORTFOLIO_URL =
  import.meta.env.VITE_PORTFOLIO_DATA_URL ?? `${BASE}/portfolio.json`;

const TIMELINE_URL =
  import.meta.env.VITE_TIMELINE_DATA_URL ?? `${BASE}/timeline.json`;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json() as Promise<T>;
}

export const getPortfolioData = () => fetchJson<PortfolioData>(PORTFOLIO_URL);
export const getTimelineData  = () => fetchJson<TimelineData>(TIMELINE_URL);
