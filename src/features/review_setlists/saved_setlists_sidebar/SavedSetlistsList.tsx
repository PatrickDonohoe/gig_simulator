import SavedSetlistTile from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistTile';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

export interface SavedSetlistsListProps {
  setlists: Omit<SubmitSetlistType, 'setlistSongs'>[];
  handleSetlist: (id: string) => void;
}

const SavedSetlistsList = ({
  setlists,
  handleSetlist,
}: SavedSetlistsListProps) => {
  return (
    <div
      data-cy="list"
      className="flex min-h-0 px-2 flex-1 flex-col items-center gap-2 overflow-y-auto bg-primary text-text-main"
    >
      {setlists.map((set) => (
        <SavedSetlistTile
          key={set.setlistId}
          set={set}
          handleSetlist={handleSetlist}
        />
      ))}
    </div>
  );
};
export default SavedSetlistsList;
