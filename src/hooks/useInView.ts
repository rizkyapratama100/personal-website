import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Percentage of the element that must be visible before triggering (0–1). Default: 0.15 */
  threshold?: number
  /** Root margin, same syntax as IntersectionObserver rootMargin. Default: '0px' */
  rootMargin?: string
  /** If true, the hook only fires once and never resets. Default: false */
  once?: boolean
}

/**
 * useInView
 *
 * Returns a ref to attach to a DOM element and a boolean `inView` that is
 * true when the element is visible in the viewport.
 *
 * Usage:
 *   const { ref, inView } = useInView({ threshold: 0.2 })
 *   return <div ref={ref} className={inView ? 'visible' : 'hidden'} />
 */
export function useInView<T extends Element = HTMLDivElement>(options: UseInViewOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px', once = false } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else {
          if (!once) setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
