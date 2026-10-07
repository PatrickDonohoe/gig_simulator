import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import SongTile from '@/features/songs_library/components/song_tile/SongTile';
import type { SortType } from '@/features/songs_library/hooks/sorting/useSort';
import ColumnHeader from '@/features/songs_library/components/library_view/list_view/ColumnHeader';
import { headerKeys } from '@/features/songs_library/constants/headerKeys';

interface ListViewProps {
  results: SongType[];
  sortDir: SortType['dir'];
  sortKey: SortType['key'];
  toggleSort: (nk: SortType['key']) => void;
}

// TODO: change from grid to table
const LibraryListView = ({
  results,
  sortDir,
  sortKey,
  toggleSort,
}: ListViewProps) => {
  const [selectedTile, setSelectedTile] = useState<SongType>(results[0]);

  return (
    <div id="list-view" className="flex flex-col gap-4">
      <table id="list-table" className="">
        <thead>
          <tr id="header-row" className="">
            {/* map of column header buttons for sorting */}
            {headerKeys.map((header) => (
              <ColumnHeader
                key={header}
                headerKey={header}
                sortDir={sortDir}
                isSortKey={sortKey === header}
                onClick={() => toggleSort(header)}
              />
            ))}
          </tr>
        </thead>

        {/* Body of the "table" */}
        <tbody className="">
          {results.map((song) => (
            // placeholder row until song row is written
            <tr key={song.id} id={song.id}>
              {/* The row will have to map over the useable keys to fill each column */}
              <td>{song.title}</td>
              <td>{song.artists}</td>
              <td>{song.duration}</td>
              <td>
                {song.key} {song.mode}
              </td>
              <td>{song.tempo}</td>
              <td>
                <button
                  type="button"
                  onClick={() => setSelectedTile(song)}
                  className="rounded-md border border-text-main bg-bg-main px-1 text-text-main transition-colors hover:bg-accent dark:hover:text-black"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Featured song */}
      <div className="flex p-2">
        <SongTile song={selectedTile} />
      </div>
    </div>
  );
};
export default LibraryListView;
