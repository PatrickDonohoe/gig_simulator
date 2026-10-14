import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

export interface SavedSetlistTileProps {
  set: Omit<SubmitSetlistType, 'setlistSongs'>;
  handleSetlist: () => void;
}

const SavedSetlistTile = ({ set, handleSetlist }: SavedSetlistTileProps) => {
  return (
    <button
      data-cy={`sidebar-tile-${set.setlistId}`}
      className="flex max-h-18 w-full items-center justify-center bg-bg-main px-4 py-2 text-text-main font-semibold rounded-xl"
      onClick={handleSetlist}
    >
      {set.setlistName}
    </button>
  );
};
export default SavedSetlistTile;
