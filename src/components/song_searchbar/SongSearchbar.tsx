import { useState } from 'react';

import Ascend from '@icons/sort-ascending-svgrepo-com.svg?react';
import Descend from '@icons/sort-descending-svgrepo-com.svg?react';
import type { SearchSong } from '@/types/SearchSong';

/**
 * Searchbar input, sort direction, and submit button. Submit on enter. 3
 * character minimum with conditional formatting to indicate disabled/ready
 * status.
 */

interface SearchbarProps {
  onSearch: (params: SearchSong) => void;
  initialText?: string;
}

const SongSearchbar = ({ onSearch, initialText = '' }: SearchbarProps) => {
  const [searchText, setSearchText] = useState(initialText);
  const [sortDir, setSortDir] = useState<SearchSong['sort']>('asc');

  // Change the sort direction
  const handleSort = () =>
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  // Is the searchbar input empty
  const isTooShort = searchText?.trim().length < 3;

  const submitSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSearch({ searchText: searchText.trim(), sort: sortDir });
  };

  return (
    <form
      id="song-searchbar"
      className="flex gap-4 rounded-lg border-2 border-border-bold bg-bg-main p-2 text-text-main focus-within:border-accent"
      onSubmit={submitSearch} // onSubmit: received error: "ReccoBeats searchTracks failed: "Invalid input: expected string, received null""
    >
      <div id="title-input" className="flex-1 flex-col gap-2">
        <label htmlFor="title" className="block">
          Song Title:
        </label>

        <div className="my-auto flex gap-2">
          <input
            id="title"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Enter at least 3 letters. ex: Fly"
            className="w-full bg-bg-surface p-2 text-lg"
          />

          <button type="button" onClick={handleSort} className="*:size-8">
            {sortDir === 'asc' ? <Ascend /> : <Descend />}
          </button>
          
          <button
            type="submit"
            disabled={isTooShort}
            className="rounded-lg border-2 border-text-main p-2"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
export default SongSearchbar;
