import { useAvatarFallback } from '../../hooks/useAvatarFallback';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useProfileData } from '../../hooks/useProfileData';

interface AvatarProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const sizes = {
  sm: {
    gap: 'gap-3',
    img: 'w-9 h-9 rounded-lg',
    border: '1px solid var(--border)',
    nameClass: 'text-sm font-bold leading-tight truncate',
    roleClass: 'text-xs font-medium h-4 flex items-center',
    taglineClass: 'text-xs leading-relaxed mt-1 line-clamp-1',
    nameTag: 'div' as const,
  },
  lg: {
    gap: 'gap-4',
    img: 'w-14 h-14 rounded-xl',
    border: '2px solid var(--border)',
    nameClass: 'text-2xl font-bold tracking-tight mb-0.5',
    roleClass: 'text-sm font-medium h-5',
    taglineClass: 'text-sm leading-relaxed max-w-xs mt-3',
    nameTag: 'h1' as const,
  },
};

export function Avatar({ size = 'lg', className = '' }: AvatarProps) {
  const { name, initials, photoUrl, tagline, roles } = useProfileData();
  const { imgSrc, imgError, handleImgError } = useAvatarFallback(photoUrl);
  const role = useTypewriter(roles);
  const s = sizes[size];
  const NameTag = s.nameTag;

  return (
    <div className={className}>
      <div className={`flex items-center ${s.gap} min-w-0`}>
        {!imgError ? (
          <img
            src={imgSrc}
            alt={name}
            onError={handleImgError}
            className={`${s.img} object-cover object-top shrink-0`}
            style={{ border: s.border }}
          />
        ) : (
          <div
            className={`inline-flex items-center justify-center ${s.img} font-bold shrink-0`}
            style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: s.border }}
          >
            {initials}
          </div>
        )}

        <div className="min-w-0">
          <NameTag className={s.nameClass} style={{ color: 'var(--text-primary)' }}>
            {name}
          </NameTag>
          <div className={s.roleClass} style={{ color: 'var(--accent)' }}>
            {role}<span className="cursor" />
          </div>
        </div>
      </div>

      {tagline && (
        <p className={s.taglineClass} style={{ color: 'var(--text-secondary)' }}>
          {tagline}
        </p>
      )}
    </div>
  );
}
