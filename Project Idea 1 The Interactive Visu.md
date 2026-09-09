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
- Metadata should include: title, key, tempo, duration, time signature, cover
  Boolean, and instrumentation
- stage-mode should be high-contrast, light and dark theme friendly, include a
  metronome function, count-down timer, skip to next song, anticipated finish
  time, and quick transposition tool.
- analytics tab maps out tempo patterns, key distributions, and covers vs
  original works using "recharts"
- Add library tab to review, add, and edit songs.

## Add/Edit Song Form

- [ ] Need an edit song form.
- [ ] Need to open this form as a modal on the create setlist page, edit setlist page, and library page.
- [ ] Will share all fields with the add song form. Should likely use AddSongForm but modify props to accomodate both uses.
- [ ] Song data will be provided as default values when the song to be edited is chosen and the modal is opened or as an empty object if creating a new song.
- [ ] Default values will be applied to the form 'onChange'.
- [ ] Need a resolver of the same type as the form where both have an optional id.

## Modals

- [ ] add dialog tag to all modals.

## Routing

- [ ] Create outlet in review setlists page for each tab.
- [ ] Include in route the chosen setlist as id at the end of the URL for reload purposes.

## State Management

- [ ] library persistence across pages. Consider Zustand or Context.

## Library Page

- [ ] Add song library page with similar layout to add, edit, and delete songs.
