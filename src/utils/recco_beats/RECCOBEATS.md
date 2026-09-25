# Recco Beats Walkthrough

The Recco Beats library is being used to acquire track metadata without
requiring the user to input the data manually.

The user will be able to overwrite most data. For example, they can change the
key if they prefer a different one or decide to perform at a different tempo.

## Call Requirements

The library consists of two primary ways to get data: searches and lookups.
Searches are used for finding tracks you need data for. Lookups are for getting
data for specific tracks you already have id's for.

### Searches

- Documentation states that the searchText must be at least three characters
  long.
- Need to set the search up to have a placeholder that says something about
  using at least three characters.
- Conditional formatting feedback based on number of characters input. Could
  also disable submit button (and "enter" key input) until min char count has
  been reached.

Search procedure will require the searchbar input value be passed as searchText
to getTracks.searchTracks. The parsed data will then be displayed by pagination
and "content" will be mapped over the table of results.

### Lookups

Standard lookups include the track's id in the request url and return
SongReturnSchema data. Data that can be gathered without listening to the song.

Song Audio Feature lookups include specific data about the track that are only
ascertained through listening.

Both will be necessary to gather all required information for tracks added to the library.

## Code Adaptation

Utilizing Recco Beats will be a large advantage, but it will require some
adjustments be made to the code to match keys and units of measure.

### Schema/Type

- title vs trackTitle
- artist vs artists[]
- duration vs durationMs
- key vs key + mode

### Transformation

- SongReturnSchema returns song duration in ms. Will need to transform this into
  s before display.
- Key will need to be transformed from 0-11 range to key letter plus accidental.
- Combine key and mode to generate full key. ex: { key: 2, mode: 1 } would equal
  D major.
