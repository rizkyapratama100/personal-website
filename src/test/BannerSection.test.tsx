import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BannerSection from '../components/BannerSection'
import { SOCIAL_LINKS } from '../config/social'

describe('BannerSection', () => {

  it('renders the name', () => {
    render(<BannerSection />)
    // Name is split across two lines — check for both words
    expect(screen.getByText(/RIZKY/)).toBeInTheDocument()
    expect(screen.getByText(/PRATAMA/)).toBeInTheDocument()
  })

  it('renders all three descriptor tags', () => {
    render(<BannerSection />)
    expect(screen.getByText('ROBOTICS')).toBeInTheDocument()
    expect(screen.getByText('SYSTEMS')).toBeInTheDocument()
    expect(screen.getByText('AI/ML')).toBeInTheDocument()
  })

  it('renders social icon links with correct hrefs from social config', () => {
    render(<BannerSection />)
    SOCIAL_LINKS.forEach((link) => {
      const anchors = screen.getAllByRole('link', { name: link.label })
      expect(anchors.length).toBeGreaterThan(0)
      expect(anchors[0]).toHaveAttribute('href', link.href)
    })
  })

  it('renders the photo placeholder when no photoSrc is given', () => {
    render(<BannerSection />)
    expect(screen.getByText('[ PHOTO ]')).toBeInTheDocument()
  })

  it('renders an img tag when photoSrc is provided', () => {
    render(<BannerSection photoSrc="/images/me.jpg" />)
    const img = screen.getByRole('img', { name: 'Rizky Pratama' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/images/me.jpg')
  })

  it('photo placeholder is not shown when photoSrc is provided', () => {
    render(<BannerSection photoSrc="/images/me.jpg" />)
    expect(screen.queryByText('[ PHOTO ]')).not.toBeInTheDocument()
  })

  it('external social links have rel="noopener noreferrer"', () => {
    render(<BannerSection />)
    SOCIAL_LINKS.filter((l) => !l.href.startsWith('mailto')).forEach((link) => {
      const anchor = screen.getAllByRole('link', { name: link.label })[0]
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
