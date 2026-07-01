import ManilaFolder from './ManilaFolder'
import CharacterSheet from './CharacterSheet'

/**
 * AboutSection
 *
 * Wraps CharacterSheet inside a ManilaFolder, with the blueprint section header.
 *
 * To add your photo: <AboutSection photoSrc="/images/me.jpg" />
 */
interface AboutSectionProps {
  photoSrc?: string
}

export default function AboutSection({ photoSrc }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6" aria-label="About">
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-14 flex flex-col gap-2">
          <h2 className="font-display text-7xl text-white tracking-widest">ABOUT</h2>
          <div className="blueprint-divider w-48" aria-hidden="true" />
        </div>

        {/* ── Manila folder with character sheet inside ── */}
        {/* mt-6 gives space for the tab that sits above the folder */}
        <div className="mt-6">
          <ManilaFolder>
            <CharacterSheet photoSrc={photoSrc} />
          </ManilaFolder>
        </div>

      </div>
    </section>
  )
}
