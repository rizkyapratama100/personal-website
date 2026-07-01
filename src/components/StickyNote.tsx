import type { ReactNode } from 'react'

export type StickyNoteColor = 'pink' | 'yellow' | 'green' | 'blue'

/** Cycles deterministically through 4 sticky note colors by index */
export function getStickyColor(index: number): StickyNoteColor {
  const colors: StickyNoteColor[] = ['yellow', 'pink', 'green', 'blue']
  return colors[index % colors.length]
}

const COLOR_CLASSES: Record<StickyNoteColor, string> = {
  pink:   'bg-sticky-pink',
  yellow: 'bg-sticky-yellow',
  green:  'bg-sticky-green',
  blue:   'bg-sticky-blue',
}

/** Slight rotation per color so the notes look naturally scattered */
const ROTATION_CLASSES: Record<StickyNoteColor, string> = {
  yellow: '-rotate-1',
  pink:   'rotate-1',
  green:  '-rotate-[0.5deg]',
  blue:   'rotate-[0.75deg]',
}

interface StickyNoteProps {
  color: StickyNoteColor
  children: ReactNode
  className?: string
}

export default function StickyNote({ color, children, className = '' }: StickyNoteProps) {
  return (
    <div
      className={`
        sticky-note
        ${COLOR_CLASSES[color]}
        ${ROTATION_CLASSES[color]}
        hover:rotate-0 hover:shadow-sticky-hover hover:-translate-y-1
        transition-all duration-200
        p-4
        ${className}
      `}
    >
      {children}
    </div>
  )
}
