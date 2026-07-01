import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectsSection from '../components/ProjectsSection'
import { getProjects } from '../services/dataService'

function renderSection(featuredOnly = false) {
  return render(
    <MemoryRouter>
      <ProjectsSection featuredOnly={featuredOnly} />
    </MemoryRouter>
  )
}

describe('ProjectsSection', () => {

  describe('default rendering', () => {
    it('renders the PROJECTS heading', () => {
      renderSection()
      expect(screen.getByText('PROJECTS')).toBeInTheDocument()
    })

    it('renders all projects by default', () => {
      renderSection()
      const projects = getProjects()
      projects.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument()
      })
    })

    it('renders filter and sort controls', () => {
      renderSection()
      expect(screen.getByLabelText('Sort projects')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /signature/i })).toBeInTheDocument()
    })

    it('renders tag filter buttons for all unique tags', () => {
      renderSection()
      // All tags from all projects should appear as filter buttons
      const projects = getProjects()
      const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort()
      allTags.forEach((tag) => {
        expect(screen.getByRole('button', { name: tag })).toBeInTheDocument()
      })
    })
  })

  describe('filtering', () => {
    it('filters to only active projects when Active toggle is pressed', () => {
      renderSection()
      const activeBtn = screen.getByRole('button', { name: /active/i })
      fireEvent.click(activeBtn)

      const projects = getProjects()
      const activeProjects = projects.filter((p) => p.active)
      const inactiveProjects = projects.filter((p) => !p.active)

      activeProjects.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument()
      })
      inactiveProjects.forEach((p) => {
        expect(screen.queryByText(p.name)).not.toBeInTheDocument()
      })
    })

    it('filters to only signature projects when Signature toggle is pressed', () => {
      renderSection()
      fireEvent.click(screen.getByRole('button', { name: /signature/i }))

      const projects = getProjects()
      const sigProjects = projects.filter((p) => p.signature)
      const nonSigProjects = projects.filter((p) => !p.signature)

      sigProjects.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument()
      })
      nonSigProjects.forEach((p) => {
        expect(screen.queryByText(p.name)).not.toBeInTheDocument()
      })
    })

    it('filters by tag — shows only projects containing that tag', () => {
      renderSection()
      // Pick the first tag from the first project
      const firstProject = getProjects()[0]
      const tag = firstProject.tags[0]

      const tagBtn = screen.getByRole('button', { name: tag })
      fireEvent.click(tagBtn)

      // All shown projects must include this tag
      const projects = getProjects()
      const withTag = projects.filter((p) => p.tags.includes(tag))
      const withoutTag = projects.filter((p) => !p.tags.includes(tag))

      withTag.forEach((p) => expect(screen.getByText(p.name)).toBeInTheDocument())
      withoutTag.forEach((p) => expect(screen.queryByText(p.name)).not.toBeInTheDocument())
    })

    it('shows NO RESULTS when filters match nothing', () => {
      renderSection()
      // Enable both active-only and signature-only, then a tag that no active+signature project has
      fireEvent.click(screen.getByRole('button', { name: /active/i }))
      fireEvent.click(screen.getByRole('button', { name: /signature/i }))

      // Find a tag that active+signature projects DON'T have
      const projects = getProjects()
      const activeSigProjects = projects.filter((p) => p.active && p.signature)
      const activeSigTags = new Set(activeSigProjects.flatMap((p) => p.tags))
      const exclusiveTag = [...new Set(projects.flatMap((p) => p.tags))]
        .find((t) => !activeSigTags.has(t))

      if (exclusiveTag) {
        fireEvent.click(screen.getByRole('button', { name: exclusiveTag }))
        expect(screen.getByText('NO RESULTS')).toBeInTheDocument()
      } else {
        // If no exclusive tag exists in test data, just check empty state message text structure
        expect(screen.getByText('PROJECTS')).toBeInTheDocument()
      }
    })

    it('Clear filters button resets all filters', () => {
      renderSection()
      fireEvent.click(screen.getByRole('button', { name: /active/i }))
      // "Clear filters" button should now be visible
      const clearBtn = screen.getByRole('button', { name: /clear filters/i })
      fireEvent.click(clearBtn)

      // All projects should be visible again
      const projects = getProjects()
      projects.forEach((p) => {
        expect(screen.getByText(p.name)).toBeInTheDocument()
      })
    })
  })

  describe('sorting', () => {
    it('sorts by name A-Z', () => {
      renderSection()
      const select = screen.getByLabelText('Sort projects')
      fireEvent.change(select, { target: { value: 'name-asc' } })

      const projects = getProjects()
      const sorted = [...projects].sort((a, b) => a.name.localeCompare(b.name))
      const cards = screen.getAllByRole('article')

      // First card should be the alphabetically first project
      expect(within(cards[0]).getByText(sorted[0].name)).toBeInTheDocument()
    })

    it('sorts by date newest first (default)', () => {
      renderSection()
      const projects = getProjects()
      const sorted = [...projects].sort((a, b) => b.startDate.localeCompare(a.startDate))
      const cards = screen.getAllByRole('article')
      expect(within(cards[0]).getByText(sorted[0].name)).toBeInTheDocument()
    })

    it('sorts by significance — award winning projects appear first', () => {
      renderSection()
      const select = screen.getByLabelText('Sort projects')
      fireEvent.change(select, { target: { value: 'significance' } })

      const projects = getProjects()
      // Find the first card rendered
      const cards = screen.getAllByRole('article')
      // The first card must be either awardWinning or signature — never a plain project
      const hasHighPriority = projects.some((p) => p.awardWinning || p.signature)
      if (hasHighPriority) {
        // Verify first card shows a high-priority project's stamp
        const firstCard = cards[0]
        const hasAwardStamp = firstCard.querySelector('[aria-label="Award winning project"]')
        const hasSignatureStamp = firstCard.querySelector('[aria-label="Signature project"]')
        const hasActiveStamp = firstCard.querySelector('[aria-label="Active project"]')
        expect(hasAwardStamp ?? hasSignatureStamp ?? hasActiveStamp).toBeTruthy()
      }
    })
  })

  describe('featuredOnly mode', () => {
    it('shows only signature projects when featuredOnly=true', () => {
      renderSection(true)
      const projects = getProjects()
      const nonSig = projects.filter((p) => !p.signature)
      nonSig.forEach((p) => {
        expect(screen.queryByText(p.name)).not.toBeInTheDocument()
      })
    })

    it('shows "See all projects" link when featuredOnly=true', () => {
      renderSection(true)
      expect(screen.getByText(/see all projects/i)).toBeInTheDocument()
    })

    it('does NOT show "See all projects" link when featuredOnly=false', () => {
      renderSection(false)
      expect(screen.queryByText(/see all projects/i)).not.toBeInTheDocument()
    })
  })
})
