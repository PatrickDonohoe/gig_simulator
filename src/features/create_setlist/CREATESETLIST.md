# Create Setlist Plan

## useSetlist

Handles RHF form and field array, dnd sorting and moving from one area to
another retrieval of details for display inside each tile. There will be
separate callback functions for sidebar and setlist to retrieve tile data. The
sidebar function will only return name. The setlist function will return all
song data including notes and transition times if the song has them.

### Retrieving hook params

Should I take an array of all songs in the library as an argument(defer problem
to somewhere else), retrieve them with useEffect and util function (unknown
dependency), or use a hook(defer problem to somewhere else but could be viewed
as separation of concerns)?

I could also store as a useEffect with util function and call the function
directly onSubmit of the "add song" form.

## Workspace Sidebar

Sidebar that takes ids for cameras that have not been assigned to the setlist
and displays them.

### Add Song

Shell will also include a button that opens an add song form in a modal. Form
will be of type SongType but without the id. That will be generated when added
to the sidebarArr.

## Song Tiles

Individual song tiles will include a lookup function to retrieve relevant song
data from a master list held in context. Tiles will include hover and active
states. Need a callback function to retrieve data about tile based on id.

## Setlist Form

This form will utilize RHF's useForm and useFieldArray in addition to dnd-kit
for moving songs back and forth from the sidebar. The form will be submitted as
setlist id, setlist name, and an array of setlist tiles. The notes and
transitionTime inputs will be added by insert on handleDragEnd.

### Retrieving Data for the Tile

Because useFieldArray only passes down the field array's id and the song's id, a
callback function will be used to retrieve data about the song. Special
attention will need to be paid to whether the song has transition time or notes
data.

### Calculating Time

- Song duration will be stored in the library as total seconds.
- Total setlist duration will be calculated by useMemo whenever setlist changes.
- Setlist and Sidebar arrays need to hold duration in seconds but display in
  separate hour, minute, and second format.
- Sidebar should be sortable by song length.

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
- [x] Set up Setlist to map over tile data and pass metaFilters to the tile.
- [ ] Add filter checkboxes above the setlist for displaying metadata in the
      setlist cards. House this logic in a separate hook from useSetlist.
- [ ] Make page/main content component. Add title.
- [ ] Why is a sidebar tile still showing up after it is dragged to the setlist? It still transforms into a setlist tile onDrop.
- [x] Fix empty library to still be a droppable zone.
- [ ] Make sidebar tiles take a limited height and not filled the entire library space.
- [ ] Setlist tiles need to have a border.
- [ ] Setlist needs a gap between tiles.
- [ ] Get rid of "Song #1"
- [ ] Add min/max to setlist portion of parent grid in CreateSetlistPage. There is no need for it to cover the rest of the page on wide screens.
