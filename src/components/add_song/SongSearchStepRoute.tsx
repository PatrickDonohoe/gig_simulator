import { useSearchParams } from 'react-router';

import type { SearchSong } from '@/types/SearchSong';
import { useTrackSearch } from '@/hooks/useTrackSearch';
import SongSearchbar from '@/components/song_searchbar/SongSearchbar';
import SearchResults from '@/components/search_results/SearchResults';
import NoResults from '@/components/add_song/NoResults';

const SongSearchStepRoute = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  const searchText = urlParams.get('searchText') ?? '';
  const sort: SearchSong['sort'] =
    urlParams.get('sort') === 'desc' ? 'desc' : 'asc';
  const p = Number(urlParams.get('page'));
  const page = Number.isFinite(p) ? p : 0;
  const artist = urlParams.get('artist') ?? '';
  const artistId = urlParams.get('artistId') ?? '';

  const handleSearch = (searchText: SearchSong['searchText']) =>
    setUrlParams({ searchText, sort });

  const onPageChange = (page: number) =>
    setUrlParams((prev) => {
      prev.set('page', String(page));
      return prev;
    });

  // Instantly sends a request for a resort from the db
  const handleSortToggle = () =>
    setUrlParams(
      (prev) => {
        prev.set('sort', sort === 'asc' ? 'desc' : 'asc'); // change the value of sort
        prev.delete('page'); // Returns to first page. Expected behavior for a sort
        return prev;
      },
      { replace: true },
    );

  const query =
    searchText.trim().length >= 3
      ? { searchText: searchText.trim(), sort, page, artist, artistId }
      : null;

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useTrackSearch(query);

  return (
    <div id="song-search-step" className="flex flex-col gap-4">
      <SongSearchbar
        key={searchText + sort}
        onSearch={handleSearch}
        initialText={query?.searchText ?? ''}
        onSortToggle={handleSortToggle}
        sortDir={sort}
      />

      {query === null ? (
        <p>Search for a song by title to get started.</p>
      ) : isPending ? (
        <p>Searching...</p>
      ) : isError ? (
        <p role="alert">{error?.message ?? 'Unknown error'}</p>
      ) : data?.rows.length === 0 ? (
        <NoResults searchText={searchText} />
      ) : data ? (
        <SearchResults
          results={data} // reconcile types
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
          onPageChange={onPageChange}
        />
      ) : (
        <p>Search for a song by title to get started.</p>
      )}
    </div>
  );
};
export default SongSearchStepRoute;
