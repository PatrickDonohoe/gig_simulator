import SetlistShell from '@/layouts/components/SetlistShell';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SetlistTileType } from '@/types/SetlistTileType';
import type { SetlistHeaderProps } from '@/components/SetlistHeader';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import useFilters from '@/hooks/useFilters';
import ViewCurrent from '@/features/review_setlists/current_setlist/ViewCurrent';
import EditCurrent from '@/features/review_setlists/current_setlist/EditCurrent';
import PerformCurrent from '@/features/review_setlists/current_setlist/PerformCurrent';

export interface CurrentSetlistProps {
  viewMode: ViewMode;
  songsDisplayData: SetlistTileType[];
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType;
  setlistDuration: number;
}

const CurrentSetlist = ({
  viewMode,
  songsDisplayData,
  handleMode,
  setlistData,
  setlistDuration,
}: CurrentSetlistProps) => {
  const reviewFilters = useFilters();
  const { activeFilters, handleFilter, resetFilters } = reviewFilters;

  const headerData: Omit<SetlistHeaderProps, 'children'> = {
    activeFilters,
    handleFilter,
    resetFilters,
    setlistDuration,
  };
  return (
    <SetlistShell>
      {viewMode === 'view' ? (
        <ViewCurrent
          songsDisplayData={songsDisplayData}
          handleMode={handleMode}
          setlistData={setlistData}
          headerData={headerData}
        />
      ) : viewMode === 'edit' ? (
        <EditCurrent />
      ) : (
        <PerformCurrent />
      )}
    </SetlistShell>
  );
};
export default CurrentSetlist;
