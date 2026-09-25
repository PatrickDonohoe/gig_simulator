# Library Page Data Structure

This page will need a hook, context, or store to orchestrate the displayed data
between the searchbar, filters, and sorting. Overall data flow will go from the
library store => filter => refine remaining filters => search => sort =>
LibraryFilled.

## Managing Songs

The page will use the library store to manage its songs. This data will be
needed in:

- Main panel to render either the filled or empty library.
- LibraryFilled to pass to list view and tile view.

## Filtering Results

Hooks needed:

- create a unique set of values for each attribute. These will populate the
  filter dropdowns.
- filter the displayed songs by the active filters.

## Sorting Results

Unsure how this will be accomplished at the moment. Sorting will happen after
filtering. Only songs in the list view can be sorted.

## Next Steps

- [ ] Assume a list of display results and set up conditional formatting of "no
      results" if display results is [] and list or tile view depending on local
      state.
- [ ] Create list view.
- [ ] Create tile view.
- [ ] Parse filters from display songs.
- [ ] Run useEffect based on display songs to Refine filters.
- [ ] Set up searching and debouncing.
- [ ] Set up sorting.
- [ ] Pass remaining songs to LibraryFilled.
