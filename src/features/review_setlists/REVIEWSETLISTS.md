# Review Setlists Plan

## Page Contents

Page will contain:

- [ ] sidebar consisting of setlists
- [ ] adjacent sidebar of songs not in the setlist
- [ ] setlist panel

### Setlist Panel

Panel will include three states:

- [ ] empty
- [ ] selected setlist / edit mode
- [ ] edit mode w/o songs

#### Empty State

This will appear if the user has not yet saved a setlist. Requirements:

- [ ] include watermark style art.
- [x] message inviting the user to add a setlist.
- [x] button to take the user to create setlist page.

#### Selected Setlist - View Mode

Used for quick review of setlist data. Requirements:

- [ ] Clicking a song tile or transition tile will expand data into inputs for
      edit.
- [ ] Clicking off of the tile will save those changes.
- [ ] Delete button will show in "edit mode" for that tile.
- [ ] Deletion confirmation will appear in a toast notification and include an
      "undo" button. Data will be stored in state temporarily and be overwritten
      with next action.
- [ ] View in "Performance Mode" button takes the user to a view with minimal
      distractions.
- [ ] Performance mode button trades places with cancel button when a tile is being edited.
- [ ] View analytics button that takes the user to the analytics page for that
      setlist.

### Setlist Sidebar

Sidebar will include a list of all previously saved setlists. Requirements will
include:

- [x] Title displayed on tile.
- [ ] Active tile state will differ from inactive.
- [x] Tiles will be generated from an array of setlists.
- [x] Setlists will be retrieved from storage or db when that is set up.

### Song Sidebar

- [ ] Second "song" sidebar will consist of songs not in the chosen setlist.
- [ ] It will start invisible and slide into view when a setlist is chosen.
- [ ] It and the setlist sidebar will expand and contract accordingly as each is interacted with.

## Plan to make the Setlist Pages more consistent

- [ ] Consolidate create setlist tiles and review/edit setlist tiles into one set with props to expand into edit mode.
- [ ] Separate setlist and song sidebars that alternate which is expanded.
- [ ] Edit tile on click of tile. Save tile on click outside of tile.
