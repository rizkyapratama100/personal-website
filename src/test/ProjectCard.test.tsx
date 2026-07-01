import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../types/project'

const fullProject: Project = {
  id: 'test-project',
  name: 'Test Project',
  startDate: '2023-03',
  endDate: '2023-09',
  description: 'A test project description.',
  tags: ['robotics', 'python'],
  imageUrl: '/images/test.jpg',
  link: 'https://example.com',
  detailPage: '/projects/test-project',
  active: true,
  signature: true,
  awardWinning: false,
}

const minimalProject: Project = {
  id: 'minimal',
  name: 'Minimal Project',
  startDate: '2022-01',
  endDate: '2022-06',
  description: 'Minimal description.',
  tags: [],
  imageUrl: '',
  active: false,
  signature: false,
  awardWinning: false,
}

describe('ProjectCard', () => {

  describe('with a full project (all fields)', () => {
    it('renders the project name', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })

    it('renders the description', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByText('A test project description.')).toBeInTheDocument()
    })

    it('renders all tags', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByText('robotics')).toBeInTheDocument()
      expect(screen.getByText('python')).toBeInTheDocument()
    })

    it('renders the ACTIVE stamp', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByLabelText('Active project')).toBeInTheDocument()
    })

    it('renders the SIGNATURE stamp', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByLabelText('Signature project')).toBeInTheDocument()
    })

    it('renders the external View link with correct href', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      const link = screen.getByLabelText(`View ${fullProject.name} externally`)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders the Details link with correct href', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      const link = screen.getByLabelText(`Details for ${fullProject.name}`)
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/projects/test-project')
    })

    it('renders a date range including "Present" when active', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      expect(screen.getByText(/Present/)).toBeInTheDocument()
    })

    it('renders an img for the project image', () => {
      render(<ProjectCard project={fullProject} index={0} />)
      const img = screen.getByAltText('Test Project preview')
      expect(img).toHaveAttribute('src', '/images/test.jpg')
    })
  })

  describe('with a minimal project (no optional fields)', () => {
    it('renders the project name', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      expect(screen.getByText('Minimal Project')).toBeInTheDocument()
    })

    it('does NOT render the ACTIVE stamp', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      expect(screen.queryByLabelText('Active project')).not.toBeInTheDocument()
    })

    it('does NOT render the SIGNATURE stamp', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      expect(screen.queryByLabelText('Signature project')).not.toBeInTheDocument()
    })

    it('does NOT render View or Details links', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      expect(screen.queryByLabelText(`View ${minimalProject.name} externally`)).not.toBeInTheDocument()
      expect(screen.queryByLabelText(`Details for ${minimalProject.name}`)).not.toBeInTheDocument()
    })

    it('renders image placeholder when imageUrl is empty', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      expect(screen.getByLabelText('Project image placeholder')).toBeInTheDocument()
    })

    it('renders a closed date range when not active', () => {
      render(<ProjectCard project={minimalProject} index={1} />)
      // Should show "Jan 2022 — Jun 2022" style, no "Present"
      expect(screen.queryByText(/Present/)).not.toBeInTheDocument()
    })
  })

  describe('color assignment', () => {
    it('assigns colors deterministically by index', () => {
      const { container: c0 } = render(<ProjectCard project={fullProject} index={0} />)
      const { container: c1 } = render(<ProjectCard project={fullProject} index={4} />)
      // index 0 and index 4 both map to 'yellow' — same color class
      const note0 = c0.querySelector('.bg-sticky-yellow')
      const note4 = c1.querySelector('.bg-sticky-yellow')
      expect(note0).not.toBeNull()
      expect(note4).not.toBeNull()
    })

    it('assigns different colors for adjacent indices', () => {
      const { container: c0 } = render(<ProjectCard project={fullProject} index={0} />)
      const { container: c1 } = render(<ProjectCard project={fullProject} index={1} />)
      const yellow = c0.querySelector('.bg-sticky-yellow')
      const pink = c1.querySelector('.bg-sticky-pink')
      expect(yellow).not.toBeNull()
      expect(pink).not.toBeNull()
    })
  })
})
