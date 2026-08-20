import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

export interface SavedSetlistTileProps {
  set: Omit<SubmitSetlistType, 'setlistSongs'>;
  handleSetlist: (id: string) => void;
}

const SavedSetlistTile = ({ set, handleSetlist }: SavedSetlistTileProps) => {
  return (
    <div
      data-cy="tile"
      className="flex items-center justify-center bg-bg-main px-4 py-2 text-text-main"
      onClick={() => handleSetlist(set.setlistId)}
    >
      {set.setlistName}
    </div>
  );
};
export default SavedSetlistTile;
