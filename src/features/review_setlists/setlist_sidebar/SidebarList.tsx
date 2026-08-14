import SetlistTile from '@/features/review_setlists/setlist_sidebar/SetlistTile';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

interface SidebarListProps {
  setlists: Omit<SubmitSetlistType, 'setlistSongs'>[];
  handleSetlist: (id: string) => void;
}

const SidebarList = ({ setlists, handleSetlist }: SidebarListProps) => {
  return (
    <div
      data-cy="list"
      className="flex flex-col gap-4 bg-bg-main text-text-main"
    >
      {setlists.map((set) => (
        <SetlistTile
          key={set.setlistId}
          set={set}
          handleSetlist={handleSetlist}
        />
      ))}
    </div>
  );
};
export default SidebarList;
