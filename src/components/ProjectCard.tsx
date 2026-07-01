import type { Project } from '../types/project'
import StickyNote, { getStickyColor } from './StickyNote'
import PaperclipImage from './PaperclipImage'

interface ProjectCardProps {
  project: Project
  /** Index in the list — used to assign sticky note color and polaroid tilt */
  index: number
}

/** Formats YYYY-MM or YYYY-MM-DD to a short readable label */
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  if (!month) return year
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function dateRange(start: string, end: string | null, active: boolean): string {
  const startLabel = formatDate(start)
  if (active) return `${startLabel} — Present`
  if (!end) return startLabel
  return `${startLabel} — ${formatDate(end)}`
}

/** Slight polaroid rotations by card index so photos look naturally scattered */
const POLAROID_ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 0.5]

/** Tag animation delays so each tag rocks at a different phase */
const TAG_ROCK_DELAYS = ['0s', '0.5s', '0.5s', '0s', '0s', '0.5s']

/** Trophy icon for Award Winning stamp */
function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="inline-block w-3 h-3 mr-1 -mt-0.5"
      aria-hidden="true"
    >
      <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v1A3.5 3.5 0 0 0 4.5 7H5v.5A3.5 3.5 0 0 0 8 10.95V12H6.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H8v-1.05A3.5 3.5 0 0 0 11 7.5V7h.5A3.5 3.5 0 0 0 15 3.5v-1A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5H5v4.5H4.5A2.5 2.5 0 0 1 2 4V2.5zm11 0V4a2.5 2.5 0 0 1-2.5 2.5H10V2h3.5a.5.5 0 0 1 .5.5z"/>
    </svg>
  )
}

/** Star icon for Signature stamp */
function StarIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className="inline-block w-3 h-3 mr-1 -mt-0.5"
      aria-hidden="true"
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  )
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const color = getStickyColor(index)
  const rotate = POLAROID_ROTATIONS[index % POLAROID_ROTATIONS.length]

  const {
    name, startDate, endDate, description,
    tags, imageUrl, link, detailPage,
    active, signature, awardWinning,
  } = project

  const hasStamps = active || signature || awardWinning

  return (
    <article className="group" aria-label={`Project: ${name}`}>
      <StickyNote color={color} className="flex flex-col gap-4 min-h-[480px]">

        {/* ── Thumbtacked polaroid image ── */}
        <div className="mt-8 mx-auto w-full h-52 relative">
          <PaperclipImage
            src={imageUrl || undefined}
            alt={`${name} preview`}
            className="w-full h-52"
            rotate={rotate}
            pinColor="#c0392b"
          />
        </div>

        {/* ── Rarity stamps (ACTIVE / SIGNATURE / AWARD WINNING) ── */}
        {hasStamps && (
          <div className="flex gap-2 flex-wrap mt-1">
            {active && (
              <span className="stamp-active" aria-label="Active project">
                ● ACTIVE
              </span>
            )}
            {signature && (
              <span className="stamp-signature" aria-label="Signature project">
                <StarIcon />SIGNATURE
              </span>
            )}
            {awardWinning && (
              <span className="stamp-award" aria-label="Award winning project">
                <TrophyIcon />AWARD
              </span>
            )}
          </div>
        )}

        {/* ── Name — Rajdhani display font ── */}
        <h3 className="font-title font-bold text-2xl text-gray-800 leading-tight tracking-wide uppercase">
          {name}
        </h3>

        {/* ── Date range — Inter body font ── */}
        <p className="font-body text-sm font-medium text-gray-500 tracking-wide">
          {dateRange(startDate, endDate, active)}
        </p>

        {/* ── Description — Inter body font ── */}
        <p className="font-body text-sm text-gray-700 leading-snug flex-1">
          {description}
        </p>

        {/* ── Tags — rock animation on card hover ── */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Tags">
            {tags.map((tag, i) => (
              <span
                key={tag}
                className="
                  project-tag
                  text-xs font-bold tracking-wide uppercase
                  bg-blueprint-darknavy/10 text-blueprint-darknavy
                  border border-blueprint-darknavy/20
                  px-2 py-0.5 rounded-sm
                  transition-all duration-200
                  group-hover:animate-[tag-rock_1s_steps(1)_infinite]
                  group-hover:bg-blueprint-blue group-hover:text-white group-hover:border-blueprint-blue
                "
                style={{ animationDelay: TAG_ROCK_DELAYS[i % TAG_ROCK_DELAYS.length] }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Action buttons ── */}
        {(link || detailPage) && (
          <div className="flex gap-2 flex-wrap pt-1">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name} externally`}
                className="text-xs font-bold tracking-widest uppercase
                           bg-blueprint-darknavy text-white
                           px-4 py-1.5 hover:bg-blueprint-blue
                           transition-colors duration-150"
              >
                View ↗
              </a>
            )}
            {detailPage && (
              <a
                href={detailPage}
                aria-label={`Details for ${name}`}
                className="text-xs font-bold tracking-widest uppercase
                           border border-blueprint-darknavy text-blueprint-darknavy
                           px-4 py-1.5 hover:bg-blueprint-darknavy hover:text-white
                           transition-colors duration-150"
              >
                Details →
              </a>
            )}
          </div>
        )}

      </StickyNote>
    </article>
  )
}
