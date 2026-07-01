import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

function renderNavBar() {
  return render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  )
}

describe('NavBar', () => {

  it('renders the logo text', () => {
    renderNavBar()
    expect(screen.getByText('rizkyp.com')).toBeInTheDocument()
  })

  it('renders Home, Projects, and About links', () => {
    renderNavBar()
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  })

  it('renders Blog as a coming-soon placeholder (not a real link)', () => {
    renderNavBar()
    // Blog should appear as a <span> with aria-disabled, not an <a>
    const blogItems = screen.getAllByText(/blog/i)
    blogItems.forEach((el) => {
      expect(el.tagName).not.toBe('A')
    })
  })

  it('mobile menu is hidden by default', () => {
    renderNavBar()
    const mobileMenu = document.getElementById('mobile-menu')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true')
  })

  it('hamburger button toggles mobile menu open', () => {
    renderNavBar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger)
    const mobileMenu = document.getElementById('mobile-menu')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false')
  })

  it('hamburger button toggles mobile menu closed again', () => {
    renderNavBar()
    const hamburger = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(hamburger) // open
    fireEvent.click(screen.getByRole('button', { name: /close menu/i })) // close
    const mobileMenu = document.getElementById('mobile-menu')
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true')
  })

  it('nav links have correct href anchors', () => {
    renderNavBar()
    // Desktop links — get all anchors and check at least one matches each section
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('#home')
    expect(hrefs).toContain('#projects')
    expect(hrefs).toContain('#about')
  })
})
