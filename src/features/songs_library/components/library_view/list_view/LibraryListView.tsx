import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import SongTile from '@/features/songs_library/components/song_tile/SongTile';
import type { SortType } from '@/features/songs_library/hooks/sorting/useSort';
import ColumnHeader from '@/features/songs_library/components/library_view/list_view/ColumnHeader';
import { headerKeys } from '@/features/songs_library/constants/headerKeys';
import { secToDisplay } from '@/utils/add_time/addTimeDurations';

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
    <div id="list-view" className="flex flex-col gap-16">
      <table id="list-table" className="border-2 border-text-main">
        <thead className='border-b-2 border-text-main'>
          <tr id="header-row" className="divide-x-2 divide-text-main bg-bg-main">
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

            <th></th>
          </tr>
        </thead>

        {/* Body of the "table" */}
        <tbody className="divide-y-2 divide-text-main">
          {results.map((song) => (
            // placeholder row until song row is written
            <tr key={song.id} id={song.id} className='divide-x-2 divide-text-main bg-bg-main'>
              {/* The row will have to map over the useable keys to fill each column */}
              <td className='px-2 py-1'>{song.title}</td>
              <td className='px-2 py-1'>{song.artists}</td>
              <td className='px-2 py-1'>
                {song.key} {song.mode}
              </td>
              <td className='px-2 py-1'>{song.tempo} bpm</td>
              <td className='px-2 py-1'>{secToDisplay(song.duration)}</td>
              <td className='px-2 py-1'>
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
      <div className="mx-auto">
        <SongTile song={selectedTile} />
      </div>
    </div>
  );
};
export default LibraryListView;
