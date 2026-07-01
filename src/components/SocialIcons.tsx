import { SOCIAL_LINKS } from '../config/social'

/**
 * SocialIcons
 *
 * Shared circular social icon buttons used in BannerSection and Footer.
 * All links sourced from src/config/social.ts — update there to change everywhere.
 */

interface SocialIconsProps {
  /** Size variant — 'md' (default) used in Banner, 'sm' used in Footer, 'lg' for larger display */
  size?: 'sm' | 'md' | 'lg'
}

export default function SocialIcons({ size = 'md' }: SocialIconsProps) {
  const btnSize  = size === 'sm' ? 'w-9 h-9'   : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
  const iconSize = size === 'sm' ? 'w-4 h-4'   : size === 'lg' ? 'w-7 h-7'   : 'w-5 h-5'

  return (
    <div className="flex gap-3" aria-label="Social links">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target={link.href.startsWith('mailto') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          aria-label={link.label}
          className={`
            ${btnSize} rounded-full
            bg-white text-blueprint-darknavy
            flex items-center justify-center
            hover:bg-blueprint-light hover:text-white
            transition-colors duration-200
            border border-white/20
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
          `}
        >
          <svg
            viewBox={link.viewBox ?? '0 0 24 24'}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconSize}
            aria-hidden="true"
          >
            <path d={link.iconPath} />
          </svg>
        </a>
      ))}
    </div>
  )
}
