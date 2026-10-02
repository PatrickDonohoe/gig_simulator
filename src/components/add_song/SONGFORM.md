# Song Form

One form covers three scenarios:

| Scenario                         | Route                     | Starting values                        | On save           |
| -------------------------------- | ------------------------- | -------------------------------------- | ----------------- |
| Add a song found in Recco Beats  | `add-song/track/:trackId` | `reccoToFormValues(track, audio)`      | `addSong`         |
| Add a song manually (no results) | `add-song/new`            | `emptySongFormValues()`                | `addSong`         |
| Edit a song already in library   | `edit-song/:songId`       | `songToFormValues(song)`               | `updateSong`      |

The fields are the same in all three. Only the starting values, the save
action, and the title/button text change. So there is **one form component,
one form hook, and one thin route component per scenario**. The URL decides
which scenario is showing.

See `CREATESONGFLOW.md` (in `features/songs_library`) for the search step and
how Recco Beats data is transformed on its way into the form.

## Layers

```text
Route component           →  SongFormContainer          →  AddSongForm
(EditSongRoute, etc.)        calls useSongForm(...)         presentational only;
works out defaultValues,     owns RHF form state for        doesn't know where
onSave, title, labels        the life of the route          the data came from
```

- **Route components** (`EditSongRoute`, `ManualSongRoute`, `ReccoSongRoute`)
  know where the data comes from. They read URL params, look up or fetch data,
  and pass `defaultValues`, `onSave`, `title`, and `submitLabel` to the
  container. A route should not render the form until its data is ready, so
  `defaultValues` are right on first mount and no `reset()` is needed.
- **`SongFormContainer`** calls `useSongForm(defaultValues, onSave)` and renders
  `AddSongForm` with the result.
- **`useSongForm`** holds `useForm`, the instrumentation field array, and the
  submit handler that converts `SongFormValues` → `SongType` before calling
  `onSave`.
- **`AddSongForm`** only renders inputs and errors.

Because the form state lives inside the route, closing the route unmounts it
and clears the form automatically.

## Routing

`SongFormRoutes` (in `routes/`) is defined once and spread into each page that
can open the form. Each page renders an `<Outlet />` where the form appears.

```text
<page>/add-song                  → AddSongFlow (FullScreenSheet + <Outlet />)
<page>/add-song                  →   index: SongSearchStepRoute
<page>/add-song/new              →   ManualSongRoute
<page>/add-song/track/:trackId   →   ReccoSongRoute
<page>/edit-song/:songId         → EditSongRoute
```

Opening the form is a navigation: `navigate('add-song')` or
`<Link to={`edit-song/${song.id}`}>`. "Is the form open?" is the same as "did
a child route match?"

Relative navigation is **route-relative**, not URL-segment-relative:

- `..` from `AddSongFlow` or `EditSongRoute` goes back to the page.
- `..` from a child of `add-song` (e.g. `new`) goes back to the search step.

## Context removal

`SongFormProvider` / `SongFormContext` used to hold which song was being edited
(`target`), whether the form was open, and the form state. The URL now covers
the first two, and `SongFormContainer` covers the third, so the context is
being removed.

`useSongForm` has already been rewritten to take arguments. The components
below still call the old no-argument version and **won't compile until
they're migrated**.

## Status

### Done

- [x] `SongFormRoutes` defined and used as children of `create` and `library`.
- [x] `useSongForm(defaultValues, onSave)` rewritten without context.
- [x] `SongFormContainer` created.
- [x] `EditSongRoute` looks up the song from `:songId` via `useLibraryStore`.
- [x] `<Outlet />` added to `CreateSetlistPage` and `SongsLibraryPage`.

### Routes

- [ ] Create `SongSearchStepRoute`. Move the search-param handling
      (`searchText`, `sort`, `page`) out of `AddSongFlow` into it. Selecting a
      result navigates to `track/${id}` instead of setting `?track=`.
- [ ] Create `ManualSongRoute` (empty values, `addSong`). Optionally prefill
      the title from `?title=` when arriving from "no results".
- [ ] Finish `ReccoSongRoute` (see `CREATESONGFLOW.md`).
- [ ] `AddSongFlow` renders `<Outlet />` inside `FullScreenSheet` instead of
      switching on `trackId`.
- [ ] Import `SongSearchStepRoute` and `ManualSongRoute` in `SongFormRoutes`.
- [ ] `EditSongRoute`: `<Navigate to="../.." />` should be `".."`. Route-
      relative `../..` goes above the page.
- [ ] `EditSongRoute` isn't inside `AddSongFlow`, so it needs its own wrapper
      (`FullScreenSheet` or `ModalBackdrop`) and close handler.
- [ ] Review page: put the setlist id in the URL
      (`review/:setlistId/edit-song/:songId`) and add the edit-song child.
- [ ] Separate the review and edit setlist pages by route.

### Form / hook

- [ ] Close after a successful save. `onSave` only writes to the store right
      now, so the form stays open. Have each route pass
      `(song) => { save(song); close(); }`, or give `useSongForm` an `onClose`.
- [ ] `AddSongFormProps` requires `onClose`, but `useSongForm` doesn't
      return it and `SongFormContainer` doesn't pass it (type error). Add an
      `onClose` prop to the container.
- [ ] `AddSongForm` hardcodes the heading and button text. Use the `title` and
      `submitLabel` props.
- [ ] Remove the focus-debugging `console.log`s in `AddSongForm`.

### Context migration

- [ ] `LibraryTileView` / `LibraryListView`: `openEditSong(song)` →
      `<Link to={`edit-song/${song.id}`}>` or `navigate(...)`.
- [ ] `LibraryMainPanel`: `openAddSong` → `navigate('add-song')`. Remove the
      `isSongFormOpen` block (the page's `<Outlet />` replaces it).
- [ ] `LibraryEmpty`: take a link/navigate instead of the `openAddSong` prop.
- [ ] `useSetlistEditorState`: drop `formData`, `closeSongForm`,
      `isSongFormOpen`. `onEdit` navigates to `edit-song/:id`.
- [ ] `CreateSetlistPage` and `SetlistEditMode`: remove the `isSongFormOpen`
      modal block and the now-unused `AddSongForm`/`ModalBackdrop` imports.
- [ ] Remove the `<SongFormProvider>` wrappers from `CreateSetlistPage`,
      `SongsLibraryPage`, and `CurrentSetlist`.
- [ ] Delete `SongFormProvider.tsx` and `SongFormContext.ts`.
- [ ] Update the existing edit-song tests to drive the flow through routes.
