import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import SetlistViewMode from '@/features/review_setlists/current_setlist/view/SetlistViewMode';
import SetlistEditMode from '@/features/review_setlists/current_setlist/edit/SetlistEditMode';
import SetlistPerformMode from '@/features/review_setlists/current_setlist/perform/SetlistPerformMode';
import type { SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';
import type { SongType } from '@/types/SongType';
import SetlistEmpty from '@/features/review_setlists/SetlistEmpty';
import type { ViewRow } from '@/features/review_setlists/hooks/use_review/useReview';

// TODO: return to set up as routes instead of state.

export interface CurrentSetlistProps {
  viewMode: ViewMode;
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType | undefined;
  setlistDuration: number;
  sidebarProps: SavedSetlistsListProps;
  getSongData: (songId: string) => SongType | undefined;
  removeSong: (songId: string) => void;
  rows: ViewRow[];
}

const CurrentSetlist = (props: CurrentSetlistProps) => {
  const { viewMode, setlistData, ...viewProps } = props;
  const viewModeProps = {
    setlistData,
    ...viewProps,
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
      ) : viewMode === 'view' ? (
        <SetlistViewMode {...viewModeProps} />
      ) : (
        <SetlistEmpty />
      )}
    </>
  );
};
export default CurrentSetlist;
