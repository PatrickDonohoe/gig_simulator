import { useState } from 'react';


import useSort from '@/features/songs_library/hooks/sorting/useSort';
import LibraryListView from '@/features/songs_library/components/library_view/list_view/LibraryListView';
import LibraryTileView from '@/features/songs_library/components/library_view/tile_view/LibraryTileView';
import NoResults from '@/features/songs_library/components/no_results/NoResults';
import List from '@icons/list-svgrepo-com.svg?react';
import Tile from '@icons/tile-svgrepo-com.svg?react';

/**
 * @returns Library search/filter results or "no resutls" component if none are
 *   found.
 */

const LibraryFilled = () => {
  const { sortDir, sortKey, sorted, toggleSort, resetSort } = useSort();

  const [view, setView] = useState<'tile' | 'list' | null>(
    sorted.length > 0 ? 'tile' : null,
  );

  // Resets the value of sort in useSort when the view changes.
  const handleView = (v: typeof view) => {
    setView(v);
    resetSort();
  }

  return (
    <div
      id="library-filled"
      className="flex flex-col gap-4 bg-bg-main text-text-main"
    >


      <div
        id="library-filled-body"
        className="flex flex-col divide-border-bold border-border-bold p-4 shadow-2xl w-full"
      >
        <div id="body-header" className="grid grid-cols-3 p-1 w-full">
          <div
            id="view-switching-buttons"
            className="flex divide-x-2 divide-border-bold border-2 border-border-bold rounded-md bg-bg-main shadow-xl text-text-main"
          >
            <button id="tile-button" className={`px-2 ${view === 'tile' ? 'text-accent' : 'text-text-main'}`} onClick={() => handleView('tile')}>
              <Tile className="size-8" />
            </button>

            <button id="list-button" className={`px-2 ${view === 'list' ? 'text-accent' : 'text-text-main'}`} onClick={() => handleView('list')}>
              <List className="size-8" />
            </button>
          </div>

          <h3 className="text-xl font-semibold text-shadow-lg text-center">Songs</h3>
        </div>

        {view === 'tile' ? (
          <LibraryTileView results={sorted} />
        ) : view === 'list' ? (
          <LibraryListView results={sorted} 
            sortDir={sortDir}
            sortKey={sortKey}
            toggleSort={toggleSort}
          />
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
};
export default LibraryFilled;
