# Create Setlist Plan

## useSetlist

Handles RHF form and field array, dnd sorting and moving from one area to
another retrieval of details for display inside each tile.

## Workspace Sidebar

Sidebar that takes ids for cameras that have not been assigned to the setlist
and displays them.

### Add Song

Shell will also include a button that opens an add song form in a modal. Form
will be of type SongType but without the id. That will be generated when added
to the sidebarList.

## Drag and Drop Area

Currently, the functionality is in the WorkspaceSidebar, but for SoC, I may move
that to this component once the header and other functionality is added in. An
array of free song id's will be mapped over to display all available songs.
Shell or array of tiles will include drag active state.

## Song Tiles

Individual song tiles will include a lookup function to retrieve relevant song
data from a master list held in context. Tiles will include hover and active
states. Need a callback function to retrieve data about tile based on id.

## Setlist Form

This form will utilize RHF's useForm and useFieldArray in addition to dnd-kit
for moving songs back and forth from the sidebar. The form will be
SetlistTileType[] with each tile being SetlistTileType. The notes and
transitionTime inputs will be added by insert on handleDragEnd.

## ToDo List

- Add song button.
- Add song form.
- Use storybook to confirm layout and appearance of each component.
- Write tests with vitest to ensure the hook and util function behave as
  expected.
- Decide what to do with DragNDropArea.
- Set up Setlist to map over setlistList and pass metaFilters to the tile.
- Add filter checkboxes above the setlist for displaying metadata in the setlist
  cards. House this logic in a separate hook from useSetlist.
- Make page/main content component. Add title.
