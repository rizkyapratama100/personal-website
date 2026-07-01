import '@testing-library/jest-dom'

// ── Browser API mocks not available in jsdom ──────────────────────────

// IntersectionObserver — used by BannerSection, ManilaFolder, ProjectsSection
class MockIntersectionObserver {
  observe = () => {}
  disconnect = () => {}
  unobserve = () => {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

// window.scrollY — used by useScrollDirection
Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0,
})

