/**
 * Project data schema.
 *
 * To add a project, edit src/data/projects.json.
 * To migrate to Cloudflare D1 / KV in the future, update src/services/dataService.ts only —
 * this interface stays the same.
 */
export interface Project {
  /** Unique slug, used as a URL key for future detail pages (e.g. "my-robot") */
  id: string;

  /** Display name */
  name: string;

  /** ISO date string — YYYY-MM or YYYY-MM-DD */
  startDate: string;

  /** ISO date string, or null if the project is still active */
  endDate: string | null;

  /** Short description shown on the sticky note (1–3 sentences) */
  description: string;

  /** Searchable/filterable tags (lowercase, e.g. ["robotics", "ros2"]) */
  tags: string[];

  /**
   * Path to a preview image.
   * Use a public/ path (e.g. "/images/projects/my-robot.jpg") or an absolute URL.
   * Leave as empty string if no image — the card will render a placeholder.
   */
  imageUrl: string;

  /** Optional external link (GitHub repo, live demo, paper, etc.) */
  link?: string;

  /**
   * Optional path for a future in-site detail page.
   * When set and a /projects/:id route exists, the card will show a "Details" button.
   * Format: "/projects/my-robot"
   */
  detailPage?: string;

  /** True if the project is currently in active development */
  active: boolean;

  /**
   * True if this is a signature / featured project.
   * Used for sorting by significance and for the future featuredOnly toggle.
   */
  signature: boolean;

  /**
   * True if this project has won an award or competition.
   * Shows a gold "Award Winning" legendary-rarity stamp on the card.
   */
  awardWinning: boolean;
}
