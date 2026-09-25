# Create Song Flow

A form that is placed over the top of the parent page via outlet.

## Search

A searchbar will call the Recco Beats DB to find tracks that match the given
title. This will be a form with a submit button. Searches can include artist
name, artist id, sort order, and more. At this time, only sort order will be
included and will be placed between the searchbar and the submit button as a
vertical arrow icon.

## Results

Results of the search will be paginated, sorted, and displayed in a table/grid
for the user to review. Users can select a song by clicking a "Use this song"
button at the end of the row.

## TO-DO

- [ ] incorporate useTrackSearch into onSubmit of searchbar form.
- [ ] add handlers and buttons for pagination.
- [ ] add handlers and buttons for sort.
- [ ] utilize current list view table row to make consolidated search row with
      button.
- [ ] create table for search results.
- [ ] make onSubmit of "use this song" button pre-fill the "add song form".
