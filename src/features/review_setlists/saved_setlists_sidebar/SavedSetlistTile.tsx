import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

export interface SavedSetlistTileProps {
  set: Omit<SubmitSetlistType, 'setlistSongs'>;
  handleSetlist: (id: string) => void;
}

const SavedSetlistTile = ({ set, handleSetlist }: SavedSetlistTileProps) => {
  return (
    <button
      data-cy="sidebar-tile"
      className="flex max-h-18 w-full items-center justify-center rounded-xl bg-bg-main px-4 py-2 font-semibold text-text-main"
      onClick={() => handleSetlist(set.setlistId)}
    >
      {set.setlistName}
    </button>
  );
};
export default SavedSetlistTile;
