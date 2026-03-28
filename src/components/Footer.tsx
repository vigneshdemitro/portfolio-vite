interface FooterProps {
  name?: string;
}

function FooterContent({ name }: FooterProps) {
  return (
    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
      Built by <span className="text-shimmer font-semibold">{name}</span>
      {' '}· Vite + React + Tailwind · AI assisted
    </p>
  );
}

export function Footer({ name }: FooterProps) {
  if (!name) return null;

  return (
    <>
      {/* Desktop — fixed full width at bottom */}
      <footer
        className="hidden lg:flex fixed bottom-0 left-0 right-0 z-40 items-center justify-center py-3"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      >
        <FooterContent name={name} />
      </footer>

      {/* Mobile — fixed above bottom nav */}
      <footer
        className="lg:hidden fixed bottom-14 left-0 right-0 z-40 flex items-center justify-center py-2"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
      >
        <FooterContent name={name} />
      </footer>
    </>
  );
}
