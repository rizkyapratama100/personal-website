/**
 * social.ts — central config for all social/contact links.
 *
 * Update these values here and they'll automatically reflect
 * in the Banner, About section, and Footer.
 */

export interface SocialLink {
  id: string
  label: string
  href: string
  /** SVG path data for the icon */
  iconPath: string
  /** viewBox for the SVG — defaults to "0 0 24 24" */
  viewBox?: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rizkyp1/',
    // LinkedIn "in" logo
    iconPath:
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    viewBox: '0 0 24 24',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/rizkyapratama100',
    // GitHub mark (simplified)
    iconPath:
      'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
    viewBox: '0 0 24 24',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:rp@rizkyp.com',
    // Envelope icon
    iconPath:
      'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    viewBox: '0 0 24 24',
  },
]
