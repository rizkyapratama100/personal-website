import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down' | 'idle'

/**
 * useScrollDirection
 *
 * Tracks whether the user is scrolling up or down.
 * Returns 'idle' on mount before any scroll event fires.
 *
 * Usage:
 *   const direction = useScrollDirection()
 *   // direction === 'down' | 'up' | 'idle'
 */
export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('idle')
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function handleScroll() {
      const currentY = window.scrollY
      const diff = currentY - lastY.current

      // Ignore micro-movements (< 2px) to avoid jitter
      if (Math.abs(diff) < 2) return

      setDirection(diff > 0 ? 'down' : 'up')
      lastY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
