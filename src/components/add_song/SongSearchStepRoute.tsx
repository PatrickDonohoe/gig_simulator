import { useSearchParams } from 'react-router';

import type { SearchSong } from '@/types/SearchSong';
import { useTrackSearch } from '@/hooks/useTrackSearch';
import SongSearchbar from '@/components/song_searchbar/SongSearchbar';
import SearchResults from '@/components/search_results/SearchResults';

const SongSearchStepRoute = () => {
  const [urlParams, setUrlParams] = useSearchParams();

  const searchText = urlParams.get('searchText') ?? '';
  const sort: SearchSong['sort'] =
    urlParams.get('sort') === 'desc' ? 'desc' : 'asc';
  const p = Number(urlParams.get('page'));
  const page = Number.isFinite(p) ? p : 0;
  const artist = urlParams.get('artist') ?? '';
  const artistId = urlParams.get('artistId') ?? '';

  const handleSearch = (search: Pick<SearchSong, 'searchText' | 'sort'>) =>
    setUrlParams({ searchText: search.searchText, sort: search.sort ?? 'asc' });

  const onPageChange = (page: number) =>
    setUrlParams((prev) => {
      prev.set('page', String(page));
      return prev;
    });

  const query =
    searchText.trim().length >= 3 ? { searchText: searchText.trim(), sort, page, artist, artistId } : null;

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useTrackSearch(query);

  return (
    <div id="song-search-step" className="flex flex-col gap-4">
      <SongSearchbar
        onSearch={handleSearch}
        initialText={query?.searchText ?? ''}
      />

      {query === null ? (
        <p>Search for a song by title to get started.</p>
      ) : isPending ? (
        <p>Searching...</p>
      ) : isError ? (
        <p role="alert">{error?.message ?? 'Unknown error'}</p>
      ) : data?.rows.length === 0 ? (
        <p>No songs found for "{query.searchText}".</p>
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
