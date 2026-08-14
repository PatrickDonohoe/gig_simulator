# Review Setlists Plan

## Page Contents

Page will contain:

- [ ] sidebar consisting of setlists
- [ ] setlist panel

### Setlist Panel

Panel will include three states:

- [ ] empty
- [ ] selected setlist
- [ ] edit mode

#### Empty State

This will appear if the user has not yet saved a setlist. Requirements:

- [ ] include watermark style art.
- [ ] message inviting the user to add a setlist.
- [ ] button to take the user to create setlist page.

#### Selected Setlist - View Mode

Used for quick review of setlist data. Requirements:

- [ ] Edit button present in the header to toggle all readOnly attributes.
- [ ] View in "Performance Mode" button takes the user to a view with minimal
      distractions.
- [ ] View analytics button that takes the user to the analytics page for that
      setlist.

#### Edit Mode

Will allow edits of all setlist-related fields. Requirements:

- [ ] Cancel button is added.
- [ ] Edit button becomes a save button.

### Sidebar

Sidebar will include a list of all previously saved setlists. Requirements will
include:

- [ ] Title displayed on tile.
- [ ] Active tile state will differ from inactive.
- [ ] Tiles will be generated from an array of setlists.
- [ ] Setlists will be retrieved from storage or db when that is set up.
