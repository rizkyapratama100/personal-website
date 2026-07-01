import type { ReactNode } from 'react'
import { SOCIAL_LINKS } from '../config/social'
import Polaroid from './Polaroid'
import Thumbtack from './Thumbtack'
import eclairLogo from '../assets/eclair2.png'
import hmsLogo from '../assets/hms2.png'
import visaLogo from '../assets/visa-brandmark-blue.png'

/**
 * CharacterSheet
 *
 * Layout:
 *   TOP — two columns: left = stat block + description + contact,
 *                      right = polaroid photo
 *   BOTTOM — full-width single column: affiliations, personal interests
 *
 * This gives affiliations the entire width so all three logos fill the row.
 */

interface Affiliation {
  name: string
  href: string
  logoSrc?: string
}

// ── Edit your affiliations here ──────────────────────────────────────
const AFFILIATIONS: Affiliation[] = [
  { name: 'ECLAIR Robotics',    href: 'https://eclairrobotics.web.app/',               logoSrc: eclairLogo },
  { name: 'Hello Maker Studio', href: 'https://exl.cns.utexas.edu/hello-maker-studio', logoSrc: hmsLogo },
  { name: 'Visa',               href: 'https://www.visa.com/en-us/business',            logoSrc: visaLogo },
]

interface CharacterSheetProps {
  photoSrc?: string
}

export default function CharacterSheet({ photoSrc }: CharacterSheetProps) {
  return (
    <div className="notebook-paper relative text-gray-800 p-6 sm:p-10">

      {/* ══ TOP SECTION — two columns ══════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">

        {/* ── Left: stat block + description + contact ── */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">

          {/* Header stat block */}
          <div className="flex flex-col gap-3 border-b-2 border-blue-300/50 pb-5">
            <div className="flex flex-wrap gap-x-10 gap-y-3">
              <StatField label="Name"          value="Rizky Pratama" />
              <StatField label="Class & Level" value="UTCS '28" />
              <StatField label="Minor"         value="Robotics" />
            </div>
            <div className="flex flex-wrap gap-x-10">
              <StatField
                label="Current Whereabouts"
                value="Interning for Visa in Colorado!"
              />
            </div>
          </div>

          {/* Description */}
          <SheetSection title="Description">
            <p className="font-handwritten text-2xl leading-relaxed text-gray-700">
              UTCS '28 from Houston with a focus in Robotics, Systems, and Computer Vision. C, Java, and Python coder. I can CAD and 3D print stuff too. Outside of that, I enjoy bouldering, video games, board games, and most recently, cooking.
            </p>
          </SheetSection>

          {/* Contact — side by side */}
          <SheetSection title="Contact">
            <div className="flex flex-row flex-wrap gap-x-6 gap-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  className="social-icon-link flex items-center gap-2 font-handwritten text-2xl
                             text-blueprint-blue hover:text-blueprint-darknavy transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-blueprint-darknavy text-white
                                   flex items-center justify-center flex-shrink-0
                                   group-hover:bg-blueprint-blue transition-colors">
                    <svg
                      viewBox={link.viewBox ?? '0 0 24 24'}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d={link.iconPath} />
                    </svg>
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </SheetSection>

        </div>

        {/* ── Right: Polaroid photo ── */}
        <div className="flex-shrink-0 flex justify-center sm:justify-end">
          <div className="relative mt-10">
            <Thumbtack color="#c0392b" />
            <Polaroid rotate={-2} className="w-56 sm:w-72">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt="Rizky Pratama"
                  className="w-full h-auto object-cover block"
                  style={{ minHeight: '16rem' }}
                />
              ) : (
                <div
                  className="w-full bg-blueprint-mid/30 border border-white/20
                             flex flex-col items-center justify-center gap-1 text-white/30"
                  style={{ minHeight: '16rem' }}
                  aria-label="Photo placeholder"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                       className="w-10 h-10" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="font-handwritten text-base">[ photo ]</span>
                </div>
              )}
            </Polaroid>
          </div>
        </div>

      </div>

      {/* ── Divider between top and bottom sections ── */}
      <div className="border-t border-blue-300/40 mx-0 mb-10" aria-hidden="true" />

      {/* ══ BOTTOM SECTION — full width ════════════════════════════════ */}
      <div className="flex flex-col gap-8">

        {/* Affiliations — 3-column grid, full width */}
        <SheetSection title="Affiliations">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {AFFILIATIONS.map((aff) => (
              <a
                key={aff.name}
                href={aff.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aff.name}
                className="affiliation-link flex items-center justify-center p-3
                           rounded-sm hover:bg-blue-100/40 transition-colors"
              >
                {aff.logoSrc ? (
                  <img
                    src={aff.logoSrc}
                    alt={aff.name}
                    className="w-full h-auto max-h-28 object-contain hover: transition-all"
                  />
                ) : (
                  <div
                    className="w-full h-28 border border-dashed border-gray-400
                               flex items-center justify-center
                               font-handwritten text-base text-gray-400"
                  >
                    {aff.name}
                  </div>
                )}
              </a>
            ))}
          </div>
        </SheetSection>

        {/* Personal Interests */}
        <SheetSection title="Personal Interests">
          <div className="font-handwritten text-2xl text-gray-700 flex flex-col gap-2">
            <InterestLine category="Bouldering" items={[]} />
            <InterestLine
              category="Video Games"
              items={['Deadlock', 'Minecraft', 'Control', 'TF2', 'Overwatch',
                      'Overcooked', 'REPO', 'Lethal Company', 'PEAK']}
            />
            <InterestLine
              category="Board Games"
              items={['Ticket To Ride', 'Catan', 'Diplomacy']}
            />
            <InterestLine
              category="TTRPGs"
              items={["D&D", "Daggerheart (interested)", "Draw Steel (interested)", "Mothership (interested)"]}
            />
          </div>
        </SheetSection>

      </div>

    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────

function StatField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-bold tracking-widest uppercase text-gray-600 leading-tight">
        {label}
      </span>
      <span className="font-handwritten text-3xl text-gray-800 border-b border-gray-300 pr-6 leading-snug pb-0.5">
        {value}
      </span>
    </div>
  )
}

function SheetSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-base font-bold tracking-widest uppercase text-gray-600 border-b border-gray-300 pb-0.5">
        {title}
      </h3>
      {children}
    </div>
  )
}

function InterestLine({ category, items }: { category: string; items: string[] }) {
  return (
    <p>
      <span className="font-bold">{category}</span>
      {items.length > 0 && (
        <span className="text-gray-600"> — {items.join(', ')}</span>
      )}
    </p>
  )
}
