import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'
import SocialIcons from '../components/SocialIcons'
import { SOCIAL_LINKS } from '../config/social'

// ── Footer ────────────────────────────────────────────────────────────

describe('Footer', () => {

  it('renders a footer landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders social icon links with correct hrefs matching social config', () => {
    render(<Footer />)
    SOCIAL_LINKS.forEach((link) => {
      const anchors = screen.getAllByRole('link', { name: link.label })
      expect(anchors.length).toBeGreaterThan(0)
      expect(anchors[0]).toHaveAttribute('href', link.href)
    })
  })

  it('renders the Deadlock inspiration credit', () => {
    render(<Footer />)
    expect(screen.getByText(/UI aesthetic inspired by/i)).toBeInTheDocument()
  })

  it('renders the Deadlock link pointing to deadlockthegame.com', () => {
    render(<Footer />)
    const deadlockLink = screen.getByRole('link', { name: /valve.*deadlock/i })
    expect(deadlockLink).toHaveAttribute('href', 'https://www.deadlockthegame.com')
    expect(deadlockLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a copyright notice with the current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})

// ── SocialIcons ───────────────────────────────────────────────────────

describe('SocialIcons', () => {

  it('renders all social links from config', () => {
    render(<SocialIcons />)
    SOCIAL_LINKS.forEach((link) => {
      const anchors = screen.getAllByRole('link', { name: link.label })
      expect(anchors.length).toBeGreaterThan(0)
    })
  })

  it('renders correct href for each link', () => {
    render(<SocialIcons />)
    SOCIAL_LINKS.forEach((link) => {
      const anchor = screen.getAllByRole('link', { name: link.label })[0]
      expect(anchor).toHaveAttribute('href', link.href)
    })
  })

  it('external links have rel="noopener noreferrer"', () => {
    render(<SocialIcons />)
    SOCIAL_LINKS.filter((l) => !l.href.startsWith('mailto')).forEach((link) => {
      const anchor = screen.getAllByRole('link', { name: link.label })[0]
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders with sm size variant without error', () => {
    const { container } = render(<SocialIcons size="sm" />)
    expect(container.querySelectorAll('a').length).toBe(SOCIAL_LINKS.length)
  })

  it('renders with md size variant without error', () => {
    const { container } = render(<SocialIcons size="md" />)
    expect(container.querySelectorAll('a').length).toBe(SOCIAL_LINKS.length)
  })

  it('sm size uses smaller button class than md size', () => {
    const { container: smContainer } = render(<SocialIcons size="sm" />)
    const { container: mdContainer } = render(<SocialIcons size="md" />)
    // sm buttons should have w-9 class, md should have w-11
    expect(smContainer.querySelector('.w-9')).not.toBeNull()
    expect(mdContainer.querySelector('.w-11')).not.toBeNull()
  })

  // Verify Banner and Footer use the same hrefs (single source of truth)
  it('hrefs match between two SocialIcons instances (Banner and Footer parity)', () => {
    const { container: c1 } = render(<SocialIcons size="md" />)
    const { container: c2 } = render(<SocialIcons size="sm" />)
    const hrefs1 = Array.from(c1.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    const hrefs2 = Array.from(c2.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    expect(hrefs1).toEqual(hrefs2)
  })
})
