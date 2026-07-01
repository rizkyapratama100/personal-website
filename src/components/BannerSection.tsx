import { useEffect, useRef, useState } from 'react'
import SocialIcons from './SocialIcons'
import Polaroid from './Polaroid'
import Thumbtack from './Thumbtack'

/**
 * BannerSection
 *
 * Left column slides in from the left, right column from the right,
 * triggered once on mount via IntersectionObserver.
 * The animation never reverses — once in, always in.
 */

interface BannerSectionProps {
  photoSrc?: string
}

const DESCRIPTOR_TAGS = ['ROBOTICS', 'SYSTEMS', 'AI/ML'] as const

const TAG_DELAYS: Record<typeof DESCRIPTOR_TAGS[number], string> = {
  'ROBOTICS': '0s',
  'SYSTEMS':  '0.5s',
  'AI/ML':    '0s',
}

export default function BannerSection({ photoSrc }: BannerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect() // fire once only
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const leftClass  = entered ? 'banner-slide-in-left'  : 'opacity-0'
  const rightClass = entered ? 'banner-slide-in-right' : 'opacity-0'

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center px-8 py-20"
      aria-label="Banner"
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* ── Left: Name, tags, social icons ── */}
        <div className={`flex-1 flex flex-col items-center md:items-start gap-10 ${leftClass}`}>

          {/*
            Font sizes use clamp() to scale continuously with viewport width.
            ~5rem at 320px → ~13rem at 1280px+
          */}
          <h1
            className="font-display text-white tracking-widest leading-none text-center md:text-left"
            style={{ fontSize: 'clamp(5rem, 12vw, 13rem)' }}
          >
            RIZKY<br />PRATAMA
          </h1>

          {/* Deadlock-style descriptor tags */}
          <div
            className="flex flex-wrap gap-5 justify-center md:justify-start"
            aria-label="Descriptors"
            style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.25rem)' }}
          >
            {DESCRIPTOR_TAGS.map((tag) => (
              <span
                key={tag}
                className="tag-badge tag-rock px-6 py-2"
                style={{ animationDelay: TAG_DELAYS[tag] }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Blueprint divider */}
          <div className="blueprint-divider w-full max-w-sm" aria-hidden="true" />

          {/* Social icons */}
          <SocialIcons size="lg" />
        </div>

        {/* ── Right: Photo in polaroid ── */}
        <div
          className={`flex-shrink-0 flex justify-center ${rightClass}`}
          aria-label="Profile photo"
        >
          <div className="relative mt-8">
            {photoSrc ? (
              <Polaroid rotate={2} className="w-[min(22rem,80vw)] sm:w-[min(28rem,60vw)]">
                <Thumbtack color="#c0392b" className="!-top-7 !w-8 !h-12" />
                <img
                  src={photoSrc}
                  alt="Rizky Pratama"
                  className="w-full h-auto object-cover block"
                  style={{ minHeight: 'clamp(14rem, 30vw, 26rem)' }}
                />
              </Polaroid>
            ) : (
              <div
                className="
                  relative
                  border-2 border-dashed border-white/40
                  flex flex-col items-center justify-center gap-6
                  text-white/40
                "
                style={{
                  width: 'clamp(14rem, 30vw, 28rem)',
                  height: 'clamp(14rem, 30vw, 28rem)',
                }}
                aria-label="Photo placeholder"
              >
                <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/50" aria-hidden="true" />
                <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/50" aria-hidden="true" />
                <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/50" aria-hidden="true" />
                <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/50" aria-hidden="true" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                     className="w-24 h-24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="font-handwritten text-4xl tracking-wide">[ PHOTO ]</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
