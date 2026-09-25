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
  };

  return (
    <div
      id="library-filled"
      className="flex flex-col gap-4 bg-bg-main text-text-main"
    >
      <div className="flex w-full items-center justify-center">
        <h2 className="text-2xl">Library with Songs</h2>
      </div>

      <div
        id="library-filled-body"
        className="flex w-full flex-col divide-border-bold border-border-bold p-4 shadow-2xl"
      >
        <div id="body-header" className="grid w-full grid-cols-3 p-1">
          <div
            id="view-switching-buttons"
            className="flex divide-x-2 divide-border-bold rounded-md border-2 border-border-bold bg-bg-main shadow-xl"
          >
            <button
              id="tile-button"
              className="px-2"
              onClick={() => handleView('list')}
            >
              <Tile className="size-8" />
            </button>

            <button
              id="list-button"
              className="px-2"
              onClick={() => handleView('tile')}
            >
              <List className="size-8" />
            </button>
          </div>

          <h3 className="text-center text-xl font-semibold text-shadow-lg">
            Songs
          </h3>
        </div>

        {view === 'tile' ? (
          <LibraryTileView results={sorted} />
        ) : view === 'list' ? (
          <LibraryListView
            results={sorted}
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
