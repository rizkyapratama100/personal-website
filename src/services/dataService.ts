/**
 * dataService.ts
 *
 * Abstraction layer for project data.
 * Currently reads from src/data/projects.json (flat file).
 *
 * ── Migrating to Cloudflare D1 / KV ──────────────────────────────────
 * When you're ready to move to a database, only this file needs to change.
 * The rest of the app depends on the exported function signatures, not the
 * implementation. Steps:
 *   1. Replace the JSON import with a fetch() call to a Cloudflare Worker endpoint.
 *   2. Keep the return types (Promise<Project[]> / Promise<Project | undefined>).
 *   3. Remove the static import at the top.
 * ─────────────────────────────────────────────────────────────────────
 */

import type { Project } from '../types/project'
import projectsData from '../data/projects.json'

// Cast the raw JSON to our typed array once at module load.
const projects: Project[] = projectsData as Project[]

/**
 * Returns all projects.
 * Future: replace body with `await fetch('/api/projects').then(r => r.json())`
 */
export function getProjects(): Project[] {
  return projects
}

/**
 * Returns a single project by id, or undefined if not found.
 * Future: replace body with `await fetch(\`/api/projects/\${id}\`).then(r => r.json())`
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/**
 * Returns all unique tags across all projects, sorted alphabetically.
 * Useful for building filter UIs without hard-coding tag lists.
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}
