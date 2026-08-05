# Create Setlist Plan

## useSetlist

Handles RHF form and field array, dnd sorting and moving from one area to
another retrieval of details for display inside each tile. There will be
separate callback functions for sidebar and setlist to retrieve tile data. The
sidebar function will only return name. The setlist function will return all
song data including notes and transition times if the song has them.

### Retrieving hook params

Using getAllSongs function from utils to get songs and establish state in the
hook.

## Workspace Sidebar

Sidebar that takes ids for songs that have not been assigned to the setlist and
displays them.

### Add Song

Shell will also include a button that opens an add song form in a modal. Form
will be of type SongType but without the id. That will be generated when added
to the sidebarArr.

## Song Tiles

Individual song tiles will include a lookup function to retrieve relevant song
data from a master list (library) held in context. Tiles will include hover and
active states.

## Setlist Form

This form will utilize RHF's useForm and useFieldArray in addition to dnd-kit
for moving songs back and forth from the sidebar. The notes and transitionTime
inputs will be added to the tiles by insert on handleDragEnd. The form will be
submitted as setlist id, setlist name, and an array of song ID, transition time,
and notes. Transition times and notes for each song will be specific to each
setlist, not the song.

### Retrieving Data for the Tile

Because useFieldArray only passes down the field array's id and the song's id,
the getSongDisplayDetails callback function will be used to retrieve data about
the song. Special attention will need to be paid to whether the song has
transition time or notes data.

### Calculating Time

- Song duration will be stored in the library as total seconds.
- Total setlist duration will be calculated by useMemo whenever the setlist
  changes.
- Setlist and Sidebar arrays need to hold duration in seconds but display in
  separate hour, minute, and second format.
- Sidebar should be sortable by song length & title.

## ToDo List

- [x] Write tests to ensure setlist will show multiple tiles and allow for
      scrolling.
- [x] Write tests for the tiles to ensure passed filters will show the
      corresponding data.
- [x] Write larger test to determine if tiles can be moved within their own
      array through DnD.
- [x] Add song button to sidebar.
- [x] Add song form modal.
- [x] Add "Save setlist" button to local storage for use on review setlists
      page.
- [ ] Write tests with Cypress to ensure the hook and util functions behave as
      expected.
- [x] Decide what to do with DragNDropArea. Should DNDA be the larger component
      for the sidebar and setlist or a page content?
- [x] Set up Setlist to map over tile data and pass activeFilters to the tile.
- [x] Add filter checkboxes above the setlist for displaying metadata in the
      setlist cards. House this logic in a separate hook from useSetlist.
- [/] Make page/main content component. Add title.
- [x] Why is a sidebar tile still showing up after it is dragged to the setlist?
      It still transforms into a setlist tile onDrop.
- [x] Fix empty library to still be a droppable zone.
- [x] Make sidebar tiles take a limited height and not filled the entire library
      space.
- [x] Setlist tiles need to have a border.
- [x] Setlist needs a gap between tiles.
- [x] Get rid of "Song #1"
- [ ] Add min/max width to the setlist portion of the parent grid in
      CreateSetlistPage. There is no need for it to cover the rest of the page
      on wide screens.
- [ ] Add sort feature to the sidebar/library with song duration in the tile or
      next to it.
- [ ] Add setlist duration to setlist header next to the title.
- [ ] Add transition time default input. It should setValue for transition times
      in the current setlist.
- [ ] Fix song submission to not include transition time and notes.
- [ ] Fix setlist submission to include transition time and notes.
