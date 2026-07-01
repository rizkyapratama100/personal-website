# rizkyp.com — Personal Website

Personal portfolio website built with Vite + React + TypeScript + Tailwind CSS.
Blueprint/Deadlock-inspired aesthetic. Hosted on Cloudflare Pages.

---

## Development

```bash
npm install
npm run dev       # start dev server at localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
npm test          # run all tests
```

---

## How to add or edit a project

Edit `src/data/projects.json`. Each project object looks like this:

```json
{
  "id": "my-project",
  "name": "My Project",
  "startDate": "2024-03",
  "endDate": null,
  "description": "A short description shown on the sticky note.",
  "tags": ["robotics", "python"],
  "imageUrl": "/images/projects/my-project.jpg",
  "link": "https://github.com/rizkyp/my-project",
  "detailPage": "/projects/my-project",
  "active": true,
  "signature": true
}
```

**Field notes:**
- `id` — unique slug, lowercase-hyphenated. Used as a key and future URL segment.
- `startDate` / `endDate` — use `YYYY-MM` format. Set `endDate` to `null` if active.
- `imageUrl` — put images in `public/images/projects/`. Leave as `""` for a placeholder.
- `link` — optional external link (GitHub, demo, paper). Omit the field to hide the button.
- `detailPage` — optional internal path for a future detail page. Omit to hide the button.
- `active` — shows a green ACTIVE stamp on the card.
- `signature` — shows a blue SIGNATURE stamp; used for the significance sort and future featured mode.

**To switch to featured-only mode** (when you have too many projects):
In `src/App.tsx`, change:
```tsx
<ProjectsSection />
```
to:
```tsx
<ProjectsSection featuredOnly />
```
This shows only `signature: true` projects and adds a "See all projects →" link.

---

## How to update social links

Edit `src/config/social.ts`. Changes propagate automatically to the Banner, About section, and Footer.

```ts
{
  id: 'linkedin',
  label: 'LinkedIn',
  href: 'https://linkedin.com/in/your-profile',
  iconPath: '...',  // SVG path data — leave unchanged
}
```

---

## How to add your photo

Pass the `photoSrc` prop in `src/App.tsx`:

```tsx
<BannerSection photoSrc="/images/me.jpg" />
<AboutSection  photoSrc="/images/me.jpg" />
```

Put the image in `public/images/me.jpg`.

---

## How to add your logo / swap the nav logo

In `src/components/NavBar.tsx`, replace the `<a>` content:
```tsx
// Current:
rizkyp.com

// Replace with:
<img src="/logo.svg" alt="rizkyp.com" className="h-8 w-auto" />
```

---

## How to add affiliation logos

In `src/components/CharacterSheet.tsx`, edit the `AFFILIATIONS` array:
```ts
const AFFILIATIONS: Affiliation[] = [
  { name: 'UT Austin',  href: 'https://utexas.edu',  logoSrc: '/images/orgs/ut.png' },
  { name: 'Visa',       href: 'https://visa.com',    logoSrc: '/images/orgs/visa.png' },
]
```

---

## Deploying to Cloudflare Pages

1. Push this repo to GitHub/GitLab.
2. In the Cloudflare Pages dashboard, connect the repo.
3. Set the build command: `npm run build`
4. Set the output directory: `dist`
5. Deploy. The `public/_redirects` file handles SPA routing automatically.

**Custom domain:** Point `rizkyp.com` to the Cloudflare Pages deployment via a CNAME record in your DNS settings.

---

## Future: migrating to Cloudflare D1 / KV

When your project list outgrows a JSON file, only `src/services/dataService.ts` needs to change.
The exported function signatures (`getProjects`, `getProjectById`, `getAllTags`) stay identical —
everything else in the app depends on those signatures, not the implementation.

Steps:
1. Create a Cloudflare Worker that queries D1 or KV.
2. In `dataService.ts`, replace the JSON import with `fetch()` calls to your Worker endpoints.
3. Update return types to `Promise<Project[]>` / `Promise<Project | undefined>` if needed.
4. Remove the static JSON import.

---

## Project structure

```
src/
  components/       # UI components
    NavBar.tsx
    BannerSection.tsx
    ProjectsSection.tsx
    ProjectCard.tsx
    StickyNote.tsx
    PaperclipImage.tsx
    AboutSection.tsx
    ManilaFolder.tsx
    CharacterSheet.tsx
    SocialIcons.tsx
    Footer.tsx
  config/
    social.ts       # ← update social links here
  data/
    projects.json   # ← add/edit projects here
  services/
    dataService.ts  # data access layer (swap for D1/KV here)
  types/
    project.ts      # Project TypeScript interface
  test/             # Vitest test files
```
