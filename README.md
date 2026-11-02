# Setlist Builder (Gig Simulator)

A setlist planner for working musicians. Build a library of songs, drag them
into a setlist, plan the transitions between them, and see the total gig time
update as you go.

<!-- TODO: add live demo link -->
<!-- TODO: add screenshot or GIF of drag-and-drop setlist building -->

## Why offline-first?

Venues are bad places to depend on a network connection. When a crowd is in the
room, cell and Wi-Fi bandwidth is often overloaded. Setlist Builder keeps your
library and setlists in `localStorage`, so everything you need on stage is
already on your device.

## Features

### Available now

- **Searchable song catalog:** search for tracks by title through the
  [ReccoBeats](https://reccobeats.com) API. Selecting a result prefills the song
  form with its title, artist, key, tempo, and duration.
- **Song library:** add, edit, and delete songs. Switch between list views with
  sorting and filtering.
- **Drag-and-drop setlists:** drag songs from the library sidebar into the
  setlist, reorder them, and move transitions between songs.
- **Transition planning:** add transitions between songs with an expected time
  and notes, such as instrument, pedal, or tuning changes.
- **Live setlist timing:** total gig time is recalculated as songs and
  transitions are added, removed, or edited.
- **Shareable setlist URLs:** each saved setlist has its own route
  (`/dash/review/:setlistId`), so reloads and links work. Viewing and editing
  happen on the same page.
- **Light and dark themes**

### In progress

- **Performance mode:** a distraction-free, high-contrast stage view with a
  metronome, countdown timer, skip-to-next, and expected finish time.
- **Analytics:** charts of tempo patterns, key distribution, and covers vs.
  originals across your library.
- **Export:** download setlists or print a simplified stage copy.
- **Demo video** on the landing page.

## Tech stack

| Area             | Tools                                                      |
| ---------------- | ---------------------------------------------------------- |
| Framework        | React 19 (with React Compiler), TypeScript, Vite           |
| Routing          | React Router (data routers and route loaders)              |
| State            | Zustand (song library), React Context (filters, theme)     |
| Server state     | TanStack Query (ReccoBeats search and track lookups)       |
| Forms/validation | React Hook Form, Zod                                       |
| Drag and drop    | Atlassian Pragmatic Drag and Drop                          |
| Styling          | Tailwind CSS v4                                            |
| Testing          | Vitest, React Testing Library, Cypress (component and e2e) |
| Tooling          | Oxlint, Oxfmt, dependency-cruiser                          |

## Architecture notes

- **Feature-based structure.** Code is organized by feature under
  `src/features/` (`create_setlist`, `review_setlists`, `songs_library`,
  `analytics`, `landing_page`). Shared components, hooks, and utilities live in
  their own top-level folders.
- **Enforced dependency boundaries.** `dependency-cruiser` checks import rules
  between layers. Run `pnpm dep:svg` to regenerate the dependency graph.
- **Route loaders instead of hooks.** Setlist data for the review pages is
  loaded by React Router before render, which keeps components simple and avoids
  fetch-in-effect patterns.
- **Local caching of API data.** ReccoBeats data rarely changes, so tracks are
  stored locally once added. Edits are stored locally too, and the original data
  can be fetched again by ReccoBeats ID.
- **One schema for each form.** Adding and editing a song share one form
  component and one Zod schema (with an optional `id`). The form opens as a
  modal on the create, review, and library pages.

## Getting started

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Then open the URL that Vite prints (default `http://localhost:5173`).

## Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Start the dev server                       |
| `pnpm build`     | Type-check and build for production        |
| `pnpm preview`   | Serve the production build locally         |
| `pnpm test`      | Run unit tests with Vitest                 |
| `pnpm coverage`  | Run unit tests with a coverage report      |
| `pnpm cy`        | Open Cypress for component and e2e tests   |
| `pnpm lint`      | Lint with Oxlint                           |
| `pnpm fmt`       | Format with Oxfmt                          |
| `pnpm dep:check` | Check import rules with dependency-cruiser |

## Testing

- **Unit tests (Vitest + React Testing Library):** utilities such as setlist
  storage, duration math, drag-and-drop reorder logic, the `useSetlist` hook,
  and setlist submission.
- **Component tests (Cypress):** setlist tiles, transition tiles, sidebars, and
  other interactive UI.
- **End-to-end tests (Cypress):** adding songs, saving setlists, editing songs,
  and viewing and editing saved setlists.

## Roadmap

1. Performance mode
2. Demo video and landing page polish
3. Analytics page with Recharts
4. Setlist export
5. Optional accounts with cloud sync, keeping `localStorage` as the offline
   cache

## Credits

- Song data: [ReccoBeats](https://reccobeats.com)
- Landing page photography from [Unsplash](https://unsplash.com): Anish
  Prajapati, Chris, and Geo Chierchia
