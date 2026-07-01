import { type ReactNode, useRef, useEffect, useState } from 'react'

/**
 * ManilaFolder
 *
 * The folder body physically "unfolds" downward (scaleY) the first time it
 * enters the viewport. The animation plays once and never reverses.
 */
interface ManilaFolderProps {
  children: ReactNode
  className?: string
}

export default function ManilaFolder({ children, className = '' }: ManilaFolderProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpened(true)
          observer.disconnect() // fire once only
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`relative ${className}`} aria-label="Manila folder">
      {/* ── Tab ── */}
      <div
        className="
          absolute -top-6 left-6
          w-28 h-6
          manila-texture
          border-t-2 border-l-2 border-r-2 border-manila-dark
          rounded-tl-sm rounded-tr-sm
        "
        aria-hidden="true"
      />

      {/* ── Folder body — opens once on scroll into view ── */}
      <div
        ref={bodyRef}
        className={`
          relative
          manila-texture
          border-2 border-manila-dark
          shadow-folder
          p-6 sm:p-8
          ${opened ? 'folder-open' : 'folder-closed'}
        `}
        style={{
          overflow: opened ? 'visible' : 'hidden',
          transformOrigin: 'top center',
        }}
      >
        {/* Top edge double-line detail */}
        <div
          className="absolute top-2 left-2 right-2 h-px bg-manila-dark/30"
          aria-hidden="true"
        />

        {children}
      </div>
    </div>
  )
}
