import { useState } from 'react'

/**
 * NavBar
 *
 * To swap the text logo for an image:
 *   Replace the <span> inside .logo-slot with:
 *   <img src="/logo.svg" alt="rizkyp.com" className="h-10 w-auto" />
 */

interface NavLink {
  label: string
  href: string
  /** If true, the link is shown but not yet functional (e.g. Blog) */
  comingSoon?: boolean
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About',    href: '#about' },
  { label: 'Blog',     href: '#',    comingSoon: true },
]

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick(href: string, comingSoon?: boolean) {
    if (comingSoon) return
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-blueprint-darknavy border-b border-white/20"
      aria-label="Main navigation"
    >
      {/* h-20 to give the larger logo and links room */}
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo slot ── */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
          className="nav-logo font-display text-4xl text-white tracking-widest hover:text-blueprint-light transition-colors"
          aria-label="rizkyp.com — go to top"
        >
          rizkyp.com
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-10" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.comingSoon ? (
                <span
                  className="font-body text-base tracking-widest uppercase text-white/30 cursor-not-allowed select-none"
                  title="Coming soon"
                  aria-disabled="true"
                >
                  {link.label}
                  <sup className="ml-1 text-xs text-blueprint-light/60">soon</sup>
                </span>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="nav-link font-body text-base tracking-widest uppercase text-white/70 hover:text-white
                             transition-colors relative group"
                >
                  {link.label}
                  {/* Underline animation */}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/60
                               group-hover:w-full transition-all duration-200"
                    aria-hidden="true"
                  />
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-2 w-10 h-10
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-0.5 w-full bg-white transition-transform duration-200
            ${menuOpen ? 'translate-y-[10px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-full bg-white transition-opacity duration-200
            ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-full bg-white transition-transform duration-200
            ${menuOpen ? '-translate-y-[10px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? 'max-h-72 border-t border-white/10' : 'max-h-0'}`}
        aria-hidden={menuOpen ? 'false' : 'true'}
      >
        <ul className="flex flex-col px-6 py-5 gap-5" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.comingSoon ? (
                <span className="font-body text-base tracking-widest uppercase text-white/30 cursor-not-allowed">
                  {link.label}
                  <sup className="ml-1 text-xs text-blueprint-light/60">soon</sup>
                </span>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-body text-base tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
