import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import SetlistViewMode from '@/features/review_setlists/current_setlist/view/SetlistViewMode';
import SetlistEditMode from '@/features/review_setlists/current_setlist/edit/SetlistEditMode';
import SetlistPerformMode from '@/features/review_setlists/current_setlist/perform/SetlistPerformMode';
import type { SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';
import type { SongType } from '@/types/SongType';

export interface CurrentSetlistProps {
  viewMode: ViewMode;
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType | undefined;
  setlistDuration: number;
  sidebarProps: SavedSetlistsListProps;
  getSongData: (songId: string) => SongType | undefined;
}

const CurrentSetlist = ({
  viewMode,
  handleMode,
  setlistData,
  setlistDuration,
  sidebarProps,
  getSongData,
}: CurrentSetlistProps) => {
  const viewModeProps = {
    handleMode,
    setlistName: setlistData?.setlistName,
    setlistDuration,
    sidebarProps,
    setlistData,
    getSongData,
  };

  return (
    <>
      {viewMode === 'edit' && setlistData ? (
        <SetlistEditMode
          key={setlistData.setlistId}
          setlistId={setlistData.setlistId}
        />
      ) : viewMode === 'perform' && setlistData ? (
        <SetlistPerformMode />
      ) : (
        <SetlistViewMode {...viewModeProps} />
      )}
    </>
  );
};
export default CurrentSetlist;
