# Create Song Flow

How a user finds a song in Recco Beats and gets it into the add song form. The
flow opens over the parent page as a route-as-modal (`<page>/add-song`). See
`SONGFORM.md` (in `components/add_song`) for the form, routes, and hook.

```text
add-song                  search + results          (SongSearchStepRoute)
   │  select a result
   ▼
add-song/track/:trackId   prefilled form            (ReccoSongRoute)

add-song/new              empty form, reached from "no results" (ManualSongRoute)
```

## Search

`SongSearchbar` is a form with a title input, a sort-direction toggle (vertical
arrow icon), and a submit button. A search needs at least 3 characters. Recco
Beats also accepts artist name, artist id, and page size; only title and sort
are exposed for now.

Search state (`searchText`, `sort`, `page`) lives in the URL search params, so
the back button and refreshes keep the results. `useTrackSearch` runs the query
through TanStack Query. The cache is keyed by those params, and
`keepPreviousData` keeps the old page visible while the next one loads.

## Results

Results are paginated and shown as a table (`ResultsTable`, md and up) or
stacked cards (`StackedCards`, small screens). Each row shows title, artist,
and duration, with a "Select" button. Below the results: current page, total
pages, and previous/next buttons.

If there are no results, show a link to `add-song/new` so the user can enter
the song manually.

## Selection

**Only the track id crosses from search to detail.** Selecting a row navigates
to `track/${id}`. Never carry the row object across the route change.

`ReccoSongRoute` reads `:trackId`, fetches the track and its audio features in
parallel, and renders the form once both have loaded.

## Data transformation

Keep data in the API's shape until a specific consumer needs a different
shape, and convert it right at that point.

| Step | Where                                | What happens                                                                                       |
| ---- | ------------------------------------ | -------------------------------------------------------------------------------------------------- |
| A    | `getTracks.ts` fetchers              | Validate with zod. **Don't reshape.** The cache holds exactly what Recco Beats sent.               |
| B    | `useTrackSearch` → `select`          | `toSearchResultsPage` maps to `SearchResultsPage`. Recco field names stop here.                    |
| B'   | `ResultsTable` / `StackedCards` JSX  | Display formatting only: `durationSec` → `m:ss`, `page + 1`.                                       |
| C    | `ReccoSongRoute`                     | `reccoToFormValues(track, audio)` → `SongFormValues`.                                              |
| D    | `useSongForm` submit                 | `SongFormValues` → `SongType` (already implemented).                                               |

`select` only changes what the component receives. It never modifies the
cache.

### Leave alone

- The cached query data. Derive from it with `select`; never edit it in place.
- The selected id. It is the only thing passed from search to detail.
- `page`: keep it 0-indexed in state and the URL. Add 1 only for display.
- Duration, key, and mode stay numbers until a mapper or the render step
  needs strings. Numbers can be sorted; `"4:05"` can't.

### Mapping details for step C

- **Title**: `trackTitle`.
- **Artist**: join all artist names with `", "`.
- **Duration**: `durationMs / 1000`, rounded, then `timeBreakdown` → strings.
- **Key**: audio `key` (−1 = none, 0 = C … 11 = B) + `mode` (0 = minor,
  1 = major). Use flat names to match the form placeholder (`Db`, `Eb`, …),
  with `m` appended for minor, and an empty string for −1.
- **Tempo**: round `audio.tempo`, then convert to a string.
- **Genre / instrumentation**: Recco Beats doesn't provide these. Leave them
  empty for the user to fill in.
- **`id`**: don't set it. The form's `id` is the *library* id, and setting it
  would make a new song look like an edit. Store the Recco Beats id separately
  as `rbid`.

## Status

### Done

- [x] Searchbar with 3-character minimum and sort toggle.
- [x] `searchTracks`, `getTrack`, `getTracks`, `getTrackAudio` fetchers with zod
      validation.
- [x] `useTrackSearch` with search params in the URL and `keepPreviousData`.
- [x] `SearchResultRow` / `SearchResultsPage` types and `toSearchResultsPage`
      mapper, wired in through `select`.
- [x] `ResultsTable` with select and previous/next buttons (needs updating; see
      below).

### Search and results

- [ ] `SearchResultsProps.searchReturn: SearchReturn` → `results:
      SearchResultsPage`. `useTrackSearch` now returns the mapped shape, so
      `SongSearchStep` and `ResultsTable` don't type-check yet.
- [ ] `ResultsTable`: read `rows` / `title` / `artist` / `durationSec`.
- [ ] `ResultsTable` duration: currently `formatDuration(durationMs * 1000)`
      (multiplies instead of dividing, and `formatDuration` only pads to two
      digits). Format `durationSec` as `m:ss`.
- [ ] Pagination is likely off by one. If `totalPages` is a count (Spring
      style), display `totalPages` (not `+ 1`) and disable "next" when
      `page >= totalPages - 1`. Confirm against a real response.
- [ ] `AddSongFlow.handlePage` returns `String(page)` instead of `prev`, which
      wipes the other search params.
- [ ] `SongSearchbar` always starts on `asc`. Initialize it from the URL's
      `sort`.
- [ ] Investigate the "expected string, received null" error noted on the
      searchbar's `onSubmit` (likely an optional field in a response schema
      that Recco Beats returns as `null`; use `.nullish()`).
- [ ] Build `StackedCards` from the same `SearchResultRow` data.
- [ ] "No results" message links to `add-song/new` (optionally with
      `?title=`).

### Selection and prefill

- [ ] Fix `useTrackDetails`: take `id: string`, and key the query by it
      (`['trackDetails', id]`). Right now every track shares one cache entry.
      Remove `keepPreviousData`; it would briefly show the previous track's
      data.
- [ ] Add an audio-features query (`getTrackAudio`) for the same id, keyed
      `['trackAudio', id]`, run in parallel with the track query.
- [ ] Move `reccoToFormValues` to `utils/recco_beats/reccoMappers.ts` as
      `(track, audio) => SongFormValues`. Delete the non-compiling stubs in
      `buildSongFormValues.ts`.
- [ ] Wire up `ReccoSongRoute`: loading/error states, then
      `SongFormContainer` with the mapped values.
- [ ] Store `rbid` on saved songs: add an optional `rbid` to `SongTypeSchema`
      and set it in `ReccoSongRoute`'s `onSave`
      (`(song) => addSong({ ...song, rbid: trackId })`). Remove the unused
      `RBSongType` interface.
- [ ] Optional: use `rbid` to mark results that are already in the library.
