import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SetlistTileType } from '@/types/SetlistTileType';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import SetlistViewMode from '@/features/review_setlists/current_setlist/view/SetlistViewMode';
import SetlistEditMode from '@/features/review_setlists/current_setlist/edit/SetlistEditMode';
import SetlistPerformMode from '@/features/review_setlists/current_setlist/perform/SetlistPerformMode';
import type { SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';

export interface CurrentSetlistProps {
  viewMode: ViewMode;
  songsDisplayData: SetlistTileType[];
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType | undefined;
  setlistDuration: number;
  sidebarProps: SavedSetlistsListProps;
}

const CurrentSetlist = ({
  viewMode,
  songsDisplayData,
  handleMode,
  setlistData,
  setlistDuration,
  sidebarProps,
}: CurrentSetlistProps) => {

  const viewModeProps = {
    songsDisplayData,
    handleMode,
    setlistName: setlistData?.setlistName,
    setlistDuration,
    sidebarProps,
    setlistData,
  };

  return (
    <>
      {viewMode === 'edit' && setlistData ? (
        <SetlistEditMode setlistId={setlistData.setlistId} />
      ) : viewMode === 'perform' && setlistData ? (
        <SetlistPerformMode />
      ) : (
        <SetlistViewMode {...viewModeProps} />
      )}
    </>
  );
};
export default CurrentSetlist;
