import { describe, it, expect } from 'vitest'
import { getProjects, getProjectById, getAllTags } from '../services/dataService'
import type { Project } from '../types/project'

describe('dataService', () => {

  // ── getProjects ────────────────────────────────────────────────────
  describe('getProjects()', () => {
    it('returns an array', () => {
      const result = getProjects()
      expect(Array.isArray(result)).toBe(true)
    })

    it('returns at least one project', () => {
      const result = getProjects()
      expect(result.length).toBeGreaterThan(0)
    })

    it('every project has required fields with correct types', () => {
      const projects = getProjects()
      projects.forEach((p: Project) => {
        expect(typeof p.id).toBe('string')
        expect(p.id.length).toBeGreaterThan(0)

        expect(typeof p.name).toBe('string')
        expect(p.name.length).toBeGreaterThan(0)

        expect(typeof p.startDate).toBe('string')

        // endDate is string or null
        expect(p.endDate === null || typeof p.endDate === 'string').toBe(true)

        expect(typeof p.description).toBe('string')

        expect(Array.isArray(p.tags)).toBe(true)

        expect(typeof p.imageUrl).toBe('string')

        expect(typeof p.active).toBe('boolean')
        expect(typeof p.signature).toBe('boolean')
      })
    })

    it('optional fields are string or undefined when present', () => {
      const projects = getProjects()
      projects.forEach((p: Project) => {
        if (p.link !== undefined) {
          expect(typeof p.link).toBe('string')
        }
        if (p.detailPage !== undefined) {
          expect(typeof p.detailPage).toBe('string')
        }
      })
    })
  })

  // ── getProjectById ─────────────────────────────────────────────────
  describe('getProjectById()', () => {
    it('returns the correct project for a valid id', () => {
      const projects = getProjects()
      const first = projects[0]
      const found = getProjectById(first.id)
      expect(found).toBeDefined()
      expect(found?.id).toBe(first.id)
      expect(found?.name).toBe(first.name)
    })

    it('returns undefined for an unknown id', () => {
      const result = getProjectById('__nonexistent_id__')
      expect(result).toBeUndefined()
    })

    it('returns the right project when multiple projects exist', () => {
      const projects = getProjects()
      // Test each project can be found by its own id
      projects.forEach((p) => {
        const found = getProjectById(p.id)
        expect(found?.id).toBe(p.id)
      })
    })
  })

  // ── getAllTags ─────────────────────────────────────────────────────
  describe('getAllTags()', () => {
    it('returns an array of strings', () => {
      const tags = getAllTags()
      expect(Array.isArray(tags)).toBe(true)
      tags.forEach((t) => expect(typeof t).toBe('string'))
    })

    it('returns tags sorted alphabetically', () => {
      const tags = getAllTags()
      const sorted = [...tags].sort()
      expect(tags).toEqual(sorted)
    })

    it('returns no duplicate tags', () => {
      const tags = getAllTags()
      const unique = new Set(tags)
      expect(tags.length).toBe(unique.size)
    })

    it('includes tags from all projects', () => {
      const tags = getAllTags()
      const projects = getProjects()
      projects.forEach((p) => {
        p.tags.forEach((tag) => {
          expect(tags).toContain(tag)
        })
      })
    })
  })
})
