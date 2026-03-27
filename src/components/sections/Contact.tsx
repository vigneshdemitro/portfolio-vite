import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { SectionHeading } from '../ui/SectionHeading';
import type { PortfolioContact } from '../../types';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface ContactProps {
  contact?: PortfolioContact;
}

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAIL_JS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID as string;
const EMAILJS_KEY      = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY  as string;

export function Contact({ contact }: ContactProps) {
  const email    = contact?.email    ?? '';
  
  const socialLinks = [
    { icon: Mail, label: email, href: `mailto:${email}` },
  ]

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_KEY);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2';
  const inputStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
  };

  return (
    <section id="contact" className="mb-24 scroll-mt-16">
      <SectionHeading label="Contact" />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <ScrollReveal>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Name
              </label>
              <input
                name="from_name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Email
              </label>
              <input
                name="reply_to"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className={`${inputClass} resize-none`}
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              <Send size={14} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle size={14} /> Message sent — I'll get back to you soon!
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={14} /> Something went wrong. Try emailing me directly.
              </div>
            )}
          </form>
        </ScrollReveal>

        {/* Direct links */}
        <ScrollReveal delay={100}>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Prefer a direct line? Reach out via email or connect on LinkedIn. I'm always open to interesting conversations.
            </p>

            {socialLinks.filter(({ href }) => href && href !== 'mailto:').map(({ icon: Icon, label, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 group"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Icon size={15} style={{ color: 'var(--accent)' }} />
                <span className="group-hover:text-[var(--text-primary)] transition-colors">{label}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
