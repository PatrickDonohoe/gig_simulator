import { useNavigate } from 'react-router';

import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SetlistTileType } from '@/types/SetlistTileType';

import SavedSetlistsList, {
  type SavedSetlistsListProps,
} from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';

import SavedSetlistsShell from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsShell';
import SavedSetlistsSidebarEmpty from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsSidebarEmpty';
import SetlistViewSongList from '@/features/review_setlists/current_setlist/view/SetlistViewSongList';
import SetlistEmpty from '@/features/review_setlists/SetlistEmpty';
import SetlistViewModeHeader from '@/features/review_setlists/current_setlist/view/SetlistViewModeHeader';
import FiltersProvider from '@/context/filters/FiltersProvider';

export interface SetlistViewModeProps {
  songsDisplayData: SetlistTileType[];
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType | undefined;
  setlistDuration: number;
  sidebarProps: SavedSetlistsListProps;
}

const SetlistViewMode = ({
  songsDisplayData,
  handleMode,
  setlistData,
  setlistDuration,
  sidebarProps,
}: SetlistViewModeProps) => {
  const navigate = useNavigate();

  const headerProps = {
    onClick: () => navigate('/dash/create'),
    header: 'Setlists',
    buttonText: 'Create Setlist',
    header2:
      sidebarProps.setlists.length > 0
        ? 'Select a setlist to review.'
        : 'Create a setlist first.',
  };

  return (
    <FiltersProvider>
      <section data-cy='view-page' className="flex min-h-0 flex-1 px-4">
        {sidebarProps.setlists.length > 0 ? (
          <SavedSetlistsShell headerProps={headerProps}>
            <SavedSetlistsList {...sidebarProps} />
          </SavedSetlistsShell>
        ) : (
          <SavedSetlistsShell headerProps={headerProps}>
            <SavedSetlistsSidebarEmpty />
          </SavedSetlistsShell>
        )}
        <div data-cy='view-page-content' className="flex flex-8 flex-col border border-border-bold">
          <SetlistViewModeHeader
            setlistDuration={setlistDuration}
            setlistName={setlistData?.setlistName}
            handleMode={handleMode}
            noSetlist={!!setlistData?.setlistId}
            otherModes={['edit', 'perform']}
          />
      
          {songsDisplayData.length > 0 ? (
            <SetlistViewSongList songsDisplayData={songsDisplayData} />
          ) : (
            <SetlistEmpty />
          )}
        </div>
      </section>
    </FiltersProvider>
  );
};
export default SetlistViewMode;
