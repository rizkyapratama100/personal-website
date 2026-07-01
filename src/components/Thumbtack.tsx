/**
 * Thumbtack
 *
 * SVG thumbtack/pushpin icon used to pin items to the bulletin board.
 * Positioned at the top-center of its parent (which should be position: relative).
 *
 * Usage:
 *   <div className="relative">
 *     <Thumbtack color="red" />
 *     <img ... />
 *   </div>
 */

interface ThumbtackProps {
  /** Pin head color. Defaults to a warm red. */
  color?: string
  /** Additional CSS classes on the outer <svg> element. */
  className?: string
}

export default function Thumbtack({ color = '#c0392b', className = '' }: ThumbtackProps) {
  return (
    <svg
      viewBox="0 0 24 36"
      fill="none"
      className={`absolute -top-5 left-1/2 -translate-x-1/2 w-6 h-9 drop-shadow-lg z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Pin head — filled circle */}
      <circle cx="12" cy="10" r="8" fill={color} />
      {/* Highlight on pin head for 3D feel */}
      <circle cx="9.5" cy="7.5" r="2.5" fill="rgba(255,255,255,0.35)" />
      {/* Pin shaft */}
      <line x1="12" y1="18" x2="12" y2="34" stroke="#888" strokeWidth="2" strokeLinecap="round" />
      {/* Small cap at the bottom of shaft */}
      <circle cx="12" cy="34" r="1.2" fill="#666" />
    </svg>
  )
}
