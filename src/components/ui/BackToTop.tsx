import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-24 right-4 lg:bottom-12 lg:right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{
        background: 'var(--accent)',
        color: '#fff',
        boxShadow: '0 4px 20px var(--accent-glow)',
      }}
    >
      <ArrowUp size={16} />
    </button>
  );
}
