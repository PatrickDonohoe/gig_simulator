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
