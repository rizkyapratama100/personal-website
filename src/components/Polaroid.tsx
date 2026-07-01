import type { ReactNode } from 'react'

/**
 * Polaroid
 *
 * Wraps children in a polaroid-style white frame — thick border on all sides,
 * extra-thick bottom border (the "caption strip"), and a drop shadow.
 *
 * Optionally accepts a slight rotation for a natural scattered look.
 *
 * Usage:
 *   <Polaroid rotate={-2}>
 *     <img src="..." className="w-full h-full object-cover" />
 *   </Polaroid>
 */

interface PolaroidProps {
  children: ReactNode
  /** Rotation in degrees. Negative = counter-clockwise. Default: 0 */
  rotate?: number
  /** Additional CSS classes on the outer wrapper */
  className?: string
}

export default function Polaroid({ children, rotate = 0, className = '' }: PolaroidProps) {
  return (
    <div
      className={`polaroid ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {/* Inner image area */}
      <div className="polaroid-image">
        {children}
      </div>
      {/* Caption strip — intentionally blank, polaroid bottom white area */}
      <div className="polaroid-caption" aria-hidden="true" />
    </div>
  )
}
