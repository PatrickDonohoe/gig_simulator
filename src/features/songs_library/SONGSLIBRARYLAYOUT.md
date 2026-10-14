# Songs Library

This page will have an area with a searchbar and filter tiles followed by a
scrollable main panel with all of the displayed songs.

Consider adding a "featured in" section to highlight what setlists the chosen
song is used in.

## Library Main Panel

The main panel will consist of either the library empty or library filled
component depending on the presence of songs in the library.

### Library Empty

The empty library component will be displayed in the main panel when no songs
are in the library. It will consist of:

- [ ] A short message about adding a song to the library.
- [ ] The add song form presented in the panel below the message.

### Library Filled

This will be a filtered list of all songs in the library. Features will include:

- [ ] A searchbar for narrowing the results.
- [ ] A list of the filtered songs passed to the selected view's component.
- [ ] **Remove. Add in next version.** Button for toggling between list and tile
      views.
- [ ] Results shown by pagination and sorted by title. Return later to add other
      sorting options.

<!-- #### Tile View

This view will include minimized tiles arranged in a flexible grid to fit and
dynamically adjust to the user's window size. Features will include:

- [ ] A button to minimize or maximize all tiles.
- [ ] A mapped grid of tiles.

##### Tiles

Reusable song tiles used for review.

- [ ] Tiles will be exandable by clicking on the textured bump area at the
      bottom.
- [ ] Starts with only the title visible, but it will show all data when
      expanded.
- [ ] There will be an edit button in the top right that opens the edit song
      form. -->

#### List View

This view will resemble a table or spreadsheet with each song. Features will
include:

- [ ] All columns in the table will be visible by default.
- [ ] Rows will have alternating colors for visibility.

<!-- - [ ] Columns will be sortable by clicking its header. Columns without data for
      the sorted column will be placed at the bottom. -->
<!-- - [ ] Columns can be hidden by clicking pills for each column listed above the
      table. -->

- [ ] Clicking an "edit" button on a row will populate a large tile covering the
      bottom part of the list view. The tile will be editable from there. The
      page will autoscroll and autofocus on the tile's first field.
