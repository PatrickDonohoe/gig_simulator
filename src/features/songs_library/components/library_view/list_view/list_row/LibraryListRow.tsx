import type { SongType } from '@/types/SongType';
import { headerKeys } from '@/features/songs_library/constants/headerKeys';

export interface ListRowProps {
  song: SongType;
  onSelect: () => void;
}

const LibraryListRow = ({ song, onSelect }: ListRowProps) => {
  return (
    <li
      id={`list-row-${song.id}`}
      onClick={onSelect}
      className="divide grid grid-cols-subgrid divide-text-main odd:bg-bg-main/80 even:bg-bg-main/50"
    >
      {headerKeys.map((headK) => (
        <div key={headK} id={`cell-${song.id}-${headK}`}>
          {song[headK]}
        </div>
      ))}
    </li>
  );
};
export default LibraryListRow;
