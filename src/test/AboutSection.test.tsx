import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../components/AboutSection'
import { SOCIAL_LINKS } from '../config/social'

function renderAbout(photoSrc?: string) {
  return render(<AboutSection photoSrc={photoSrc} />)
}

describe('AboutSection', () => {

  describe('section structure', () => {
    it('renders the ABOUT heading', () => {
      renderAbout()
      expect(screen.getByText('ABOUT')).toBeInTheDocument()
    })

    it('renders the Manila folder', () => {
      renderAbout()
      expect(screen.getByLabelText('Manila folder')).toBeInTheDocument()
    })

    it('has id="about" for nav scroll anchor', () => {
      renderAbout()
      const section = screen.getByRole('region', { name: 'About' })
      expect(section).toHaveAttribute('id', 'about')
    })
  })

  describe('character sheet fields', () => {
    it('renders the name', () => {
      renderAbout()
      expect(screen.getByText('Rizky Pratama')).toBeInTheDocument()
    })

    it('renders Class & Level', () => {
      renderAbout()
      expect(screen.getByText("UTCS '28")).toBeInTheDocument()
    })

    it('renders Minor', () => {
      renderAbout()
      expect(screen.getByText('Robotics')).toBeInTheDocument()
    })

    it('renders Current Whereabouts', () => {
      renderAbout()
      expect(screen.getByText('Interning for Visa in Colorado!')).toBeInTheDocument()
    })

    it('renders all section headings', () => {
      renderAbout()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
      expect(screen.getByText('Affiliations')).toBeInTheDocument()
      // Note: Skillset section is intentionally commented out in CharacterSheet
      expect(screen.getByText('Personal Interests')).toBeInTheDocument()
    })
  })

  describe('contact links', () => {
    it('renders all social links with correct hrefs from config', () => {
      renderAbout()
      SOCIAL_LINKS.forEach((link) => {
        const anchors = screen.getAllByRole('link', { name: link.label })
        expect(anchors.length).toBeGreaterThan(0)
        expect(anchors[0]).toHaveAttribute('href', link.href)
      })
    })

    it('external links have rel="noopener noreferrer"', () => {
      renderAbout()
      SOCIAL_LINKS.filter((l) => !l.href.startsWith('mailto')).forEach((link) => {
        const anchors = screen.getAllByRole('link', { name: link.label })
        expect(anchors[0]).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('personal interests', () => {
    it('renders Bouldering', () => {
      renderAbout()
      expect(screen.getByText('Bouldering')).toBeInTheDocument()
    })

    it('renders Video Games category with Deadlock', () => {
      renderAbout()
      expect(screen.getByText('Video Games')).toBeInTheDocument()
      expect(screen.getByText(/Deadlock/)).toBeInTheDocument()
    })

    it('renders Board Games category with Catan', () => {
      renderAbout()
      expect(screen.getByText('Board Games')).toBeInTheDocument()
      expect(screen.getByText(/Catan/)).toBeInTheDocument()
    })

    it('renders TTRPGs category with D&D', () => {
      renderAbout()
      expect(screen.getByText('TTRPGs')).toBeInTheDocument()
      expect(screen.getByText(/D&D/)).toBeInTheDocument()
    })
  })

  describe('affiliations', () => {
    it('renders affiliation links', () => {
      renderAbout()
      // Affiliations now have real logos and use aria-label matching org name
      const eclairLink = screen.getByRole('link', { name: 'ECLAIR Robotics' })
      expect(eclairLink).toBeInTheDocument()
      expect(eclairLink).toHaveAttribute('href', 'https://eclairrobotics.web.app/')
    })
  })

  describe('photo slot', () => {
    it('renders photo placeholder when no photoSrc given', () => {
      renderAbout()
      // CharacterSheet photo placeholder
      expect(screen.getByLabelText('Photo placeholder')).toBeInTheDocument()
    })

    it('renders an img when photoSrc is provided', () => {
      renderAbout('/images/me.jpg')
      const img = screen.getByRole('img', { name: 'Rizky Pratama' })
      expect(img).toHaveAttribute('src', '/images/me.jpg')
    })
  })
})
