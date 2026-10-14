# Quick Project 1: The Smart Setlist \& Gig Simulator

Build a setlist locally from songs added. Users can add metadata about each
song, anticipated transition times between songs, notes about transitions like
changing instruments or tuning setups. The app will utilize localStorage to
allow musicians to access setlists in crowded environments where signal
bandwidth is overtaxed. Users will be able to download setlists or export a
simplified, distraction-free version for stage-mode.

- have staging area for songs so that users can drag and drop songs to and from
  a place on the setlist when they are ready.
- compute total gig time as songs are dropped in place or removed.
- Have a default transition time that can be adjusted from a select.
- have a "reset all to default" button.
- Metadata should include: title, key, tempo, duration, artist, and
  instrumentation
- stage-mode should be high-contrast, light and dark theme friendly, include a
  metronome function, count-down timer, skip to next song, anticipated finish
  time.
- analytics tab maps out tempo patterns, key distributions, and covers vs
  original works using "recharts"
- Add library tab to review, add, and edit songs.

## Add/Edit Song Form

- [x] Need an edit song form.
- [/] Need to open this form as a modal on the create setlist page, edit setlist
  page, and library page.
- [x] Will share all fields with the add song form. Should likely use
      AddSongForm but modify props to accomodate both uses.
- [x] Song data will be provided as default values when the song to be edited is
      chosen and the modal is opened or as an empty object if creating a new
      song.
- [x] Need a resolver of the same type as the form where both have an optional
      id.

## Modals

- [x] add dialog tag to all modals.

## Routing

- [ ] Create outlet in review setlists page for each tab.
- [ ] Include in route the chosen setlist as id at the end of the URL for reload
      purposes.

## State Management

- [x] library persistence across pages. Consider Zustand or Context.

## Library Page

- [x] Add song library page with similar layout to add, edit, and delete songs.

## Song Data Retrieval

Song data will be retrieved from Recco Beats. It can be searched by title or
looked up through its RB id alone or in an array. Song data will be kept locally
(because it rarely changes) to reduce calls to RB's DB.

Any modifications to a track's data will also be stored locally. A track can be
reset to its original data by looking up that track by its RB id.

### Searching Songs

When adding a new song, its data will be searched via the track's title through
Recco Beats, results will need to be displayed somewhere. Options:

- If the add song form is a modal, space needs to be provided for those results.
- If it is on a separate page that the user is navigated to, the work in
  progress would need to be stored locally and retrieved upon return.
- If it is opened in a new tab, the data would need to be shared between the two
  tabs (see Medium article).
- Add song form inserted next to the setlist page somehow:
  - If it is opened below, the page would need to autofocus on the add song form
    and scroll to it. This would work well on mobile but not desktop.
  - If it is opened to the side, this would work well on desktop but not on
    mobile.
  - A compromise of these two may work well via tailwind.

### Looking Up Songs

When looking up a song, the RB id will be included in the url's endpoint. It
will require a two-step process to get both the track details and the track's
audio data. Basic track details can be looked up in bulk, but the track's audio
data would need to utilize a variation of promise.all(). I am unsure at this
time why any group calls would need to be made if the tracks are stored locally
after they are added.

## TO-DO

- [ ] Remove client-side sorting from search results table. Hold onto sorting
      logic for later, if needed.
