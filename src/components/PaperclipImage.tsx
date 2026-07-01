import Thumbtack from './Thumbtack'
import Polaroid from './Polaroid'

/**
 * PaperclipImage
 *
 * Renders an image (or placeholder) in a Polaroid frame with a thumbtack
 * pinning it at the top center — simulating a photo pinned to a cork board.
 *
 * The `rotate` prop is passed through to the Polaroid for a natural tilt.
 */

interface PaperclipImageProps {
  /** Image src. If empty string or omitted, renders a blueprint placeholder. */
  src?: string
  alt?: string
  className?: string
  /** Rotation in degrees for the polaroid tilt. Default: 0 */
  rotate?: number
  /** Thumbtack pin color. Default: red */
  pinColor?: string
}

export default function PaperclipImage({
  src,
  alt = '',
  className = '',
  rotate = 0,
  pinColor = '#c0392b',
}: PaperclipImageProps) {
  return (
    <div className={`relative flex justify-center ${className}`}>
      {/* Thumbtack sits above the polaroid */}
      <Thumbtack color={pinColor} />

      <Polaroid rotate={rotate} className="w-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover block"
          />
        ) : (
          /* Placeholder when no image provided */
          <div
            className="w-full h-full bg-blueprint-mid/30 border border-white/20
                       flex flex-col items-center justify-center gap-1 text-white/30"
            aria-label="Project image placeholder"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                 className="w-8 h-8" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="font-handwritten text-base">[ img ]</span>
          </div>
        )}
      </Polaroid>
    </div>
  )
}
