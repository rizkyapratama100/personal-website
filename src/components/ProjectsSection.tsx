import { useState, useMemo, useRef, useEffect } from 'react'
import { getProjects, getAllTags } from '../services/dataService'
import ProjectCard from './ProjectCard'
import type { Project } from '../types/project'

type SortKey = 'name-asc' | 'date-newest' | 'date-oldest' | 'significance'

/**
 * ProjectsSection
 *
 * featuredOnly — set to true when there are too many projects.
 * When true, only `signature: true` projects are shown and a
 * "See all projects →" link appears pointing to /projects.
 */
interface ProjectsSectionProps {
  featuredOnly?: boolean
}

function sortProjects(projects: Project[], sortKey: SortKey): Project[] {
  const sorted = [...projects]
  switch (sortKey) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'date-newest':
      return sorted.sort((a, b) => b.startDate.localeCompare(a.startDate))
    case 'date-oldest':
      return sorted.sort((a, b) => a.startDate.localeCompare(b.startDate))
    case 'significance':
      return sorted.sort((a, b) => {
        if (a.awardWinning && !b.awardWinning) return -1
        if (!a.awardWinning && b.awardWinning) return 1
        if (a.signature && !b.signature) return -1
        if (!a.signature && b.signature) return 1
        if (a.active && !b.active) return -1
        if (!a.active && b.active) return 1
        return b.startDate.localeCompare(a.startDate)
      })
    default:
      return sorted
  }
}

export default function ProjectsSection({ featuredOnly = false }: ProjectsSectionProps) {
  const allProjects = useMemo(() => getProjects(), [])
  const allTags = useMemo(() => getAllTags(), [])

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeOnly, setActiveOnly] = useState(false)
  const [signatureOnly, setSignatureOnly] = useState(false)
  const [awardOnly, setAwardOnly] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('date-newest')

  const filtered = useMemo(() => {
    let result = featuredOnly ? allProjects.filter((p) => p.signature) : allProjects
    if (activeOnly)    result = result.filter((p) => p.active)
    if (signatureOnly) result = result.filter((p) => p.signature)
    if (awardOnly)     result = result.filter((p) => p.awardWinning)
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => p.tags.includes(tag))
      )
    }
    return sortProjects(result, sortKey)
  }, [allProjects, featuredOnly, activeOnly, signatureOnly, awardOnly, selectedTags, sortKey])

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  function clearFilters() {
    setSelectedTags([])
    setActiveOnly(false)
    setSignatureOnly(false)
    setAwardOnly(false)
    setSortKey('date-newest')
  }

  const hasActiveFilters =
    selectedTags.length > 0 || activeOnly || signatureOnly || awardOnly || sortKey !== 'date-newest'

  // ── Scroll animation — fires once on first entry, never exits ──────
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect() // fire once only
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const contentClass = entered ? 'section-in-up' : 'opacity-0'

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6"
      aria-label="Projects"
    >
      <div className={`max-w-6xl mx-auto ${contentClass}`}>

        {/* ── Section header ── */}
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="font-display text-7xl text-white tracking-widest">PROJECTS</h2>
          <div className="blueprint-divider w-64" aria-hidden="true" />
        </div>

        {/* ── Cork board wraps filter box + project grid ── */}
        <div className="cork-board p-6 sm:p-10">

        {/* ── Filter & Sort controls — styled to match the cork board ── */}
          <div
            className="mb-10 p-5 flex flex-col gap-5 rounded-sm"
            style={{
              backgroundColor: 'rgba(90, 50, 15, 0.70)',
              border: '1px solid rgba(107, 63, 26, 0.7)',
            }}
            aria-label="Filter and sort controls"
          >
            {/* Sort */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-body text-base tracking-widest uppercase text-[#f5e6cc]/60">Sort</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label="Sort projects"
                className="text-base border px-4 py-2 tracking-wide cursor-pointer focus:outline-none rounded-sm"
                style={{
                  backgroundColor: 'rgba(70, 38, 10, 0.85)',
                  color: '#f5e6cc',
                  borderColor: 'rgba(107, 63, 26, 0.8)',
                }}
              >
                <option value="date-newest">Date — Newest first</option>
                <option value="date-oldest">Date — Oldest first</option>
                <option value="name-asc">Name — A to Z</option>
                <option value="significance">Significance</option>
              </select>
            </div>

            {/* Toggle filters */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-body text-base tracking-widest uppercase text-[#f5e6cc]/60">Filter</span>

              <button
                onClick={() => setActiveOnly((v) => !v)}
                aria-pressed={activeOnly}
                className={`text-base tracking-widest uppercase border px-4 py-1.5 transition-colors rounded-sm
                  ${activeOnly
                    ? 'bg-green-500 text-white border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                    : 'bg-transparent text-[#f5e6cc]/70 border-[rgba(107,63,26,0.6)] hover:border-green-500/50 hover:text-green-300'
                  }`}
              >
                ● Active
              </button>

              <button
                onClick={() => setSignatureOnly((v) => !v)}
                aria-pressed={signatureOnly}
                className={`text-base tracking-widest uppercase border px-4 py-1.5 transition-colors rounded-sm
                  ${signatureOnly
                    ? 'bg-indigo-500 text-white border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                    : 'bg-transparent text-[#f5e6cc]/70 border-[rgba(107,63,26,0.6)] hover:border-indigo-400/50 hover:text-indigo-200'
                  }`}
              >
                ★ Signature
              </button>

              <button
                onClick={() => setAwardOnly((v) => !v)}
                aria-pressed={awardOnly}
                className={`flex items-center gap-1 text-base tracking-widest uppercase border px-4 py-1.5 transition-colors rounded-sm
                  ${awardOnly
                    ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]'
                    : 'bg-transparent text-[#f5e6cc]/70 border-[rgba(107,63,26,0.6)] hover:border-amber-400/50 hover:text-amber-200'
                  }`}
              >
                {/* Trophy glyph — same inline style as ● and ★ above */}
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-[0.9em] h-[0.9em] inline-block align-[-0.1em]" aria-hidden="true">
                  <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v1A3.5 3.5 0 0 0 4.5 7H5v.5A3.5 3.5 0 0 0 8 10.95V12H6.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H8v-1.05A3.5 3.5 0 0 0 11 7.5V7h.5A3.5 3.5 0 0 0 15 3.5v-1A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5H5v4.5H4.5A2.5 2.5 0 0 1 2 4V2.5zm11 0V4a2.5 2.5 0 0 1-2.5 2.5H10V2h3.5a.5.5 0 0 1 .5.5z"/>
                </svg>
                Award Winning
              </button>
            </div>

            {/* Tag filter pills */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Tag filters">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                    className={`text-sm font-bold tracking-wide uppercase border px-3 py-1 rounded-sm
                      transition-colors
                      ${selectedTags.includes(tag)
                        ? 'bg-[#f5e6cc] text-[#3b1f06] border-[#f5e6cc]'
                        : 'bg-transparent text-[#f5e6cc]/60 border-[rgba(107,63,26,0.5)] hover:border-[#f5e6cc]/50 hover:text-[#f5e6cc]/90'
                      }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="self-start text-base text-[#f5e6cc]/50 hover:text-[#f5e6cc]/90
                           underline underline-offset-2 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* ── Project grid ── */}
          {filtered.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              aria-label={`${filtered.length} project${filtered.length === 1 ? '' : 's'}`}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="py-20 flex flex-col items-center gap-4"
              style={{ color: '#f5e6cc' }}
              role="status"
              aria-live="polite"
            >
              <span className="font-display text-6xl tracking-widest">NO RESULTS</span>
              <p className="font-body text-lg opacity-70">No projects match the current filters.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-lg underline underline-offset-2 transition-colors opacity-60 hover:opacity-100"
                style={{ color: '#f5e6cc' }}
              >
                Clear filters
              </button>
            </div>
          )}

        </div>{/* end cork-board */}

        {/* ── featuredOnly "See all" link ── */}
        {featuredOnly && (
          <div className="mt-14 text-center">
            <a
              href="/projects"
              className="font-body text-base tracking-widest uppercase text-white/60
                         border border-white/20 px-8 py-3
                         hover:text-white hover:border-white/50 transition-colors"
            >
              See all projects →
            </a>
          </div>
        )}

      </div>
    </section>
  )
}
