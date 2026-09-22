import { useState } from 'react';

import useSongForm from '@/hooks/useSongForm';
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

const LibraryListView = ({
  results,
  sortDir,
  sortKey,
  toggleSort,
}: ListViewProps) => {
  const { openEditSong } = useSongForm();

  const [selectedTile, setSelectedTile] = useState<SongType>(results[0]);

  return (
    <div id="list-view" className="flex flex-col gap-4">
      <div id="list-table" className="grid">
        <div id="header-row" className="grid grid-cols-subgrid">
          {/* map of column header buttons for sorting */}
          {headerKeys.map((header, index) => (
            <ColumnHeader
              key={index}
              headerKey={header}
              sortDir={sortDir}
              isSortKey={sortKey === header}
              onClick={() => toggleSort(header)}
            />
          ))}
        </div>

        {/* Body of the "table" */}
        <ul className="grid grid-cols-subgrid">
          {results.map((song) => (
            // placeholder row until song row is written
            <li
              key={song.id}
              id={song.id}
              className="cursor-pointer"
              onClick={() => setSelectedTile(song)}
            >
              {/* The row will have to map over the useable keys to fill each column */}
              {song.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Featured song */}
      <div className="flex p-2">
        <SongTile
          song={selectedTile}
          openEdit={() => openEditSong(selectedTile)}
        />
      </div>
    </div>
  );
};
export default LibraryListView;
