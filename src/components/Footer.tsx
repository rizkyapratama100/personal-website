import SocialIcons from './SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="
        bg-blueprint-darknavy border-t border-white/15
        py-10 px-6
      "
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">

        {/* ── Social icons ── */}
        <SocialIcons size="sm" />

        {/* ── Blueprint divider ── */}
        <div className="blueprint-divider w-48" aria-hidden="true" />

        {/* ── Credits ── */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-body text-base text-white/30 tracking-wide">
            © {year} Rizky Pratama
          </p>
          <p className="font-body text-sm text-white/20 tracking-wide">
            UI aesthetic inspired by{' '}
            <a
              href="https://www.deadlockthegame.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Valve's Deadlock game website"
              className="text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors"
            >
              Valve's Deadlock
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
