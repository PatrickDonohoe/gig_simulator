import { useNavigate } from 'react-router';

import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';

import SavedSetlistsList, {
  type SavedSetlistsListProps,
} from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';

import SavedSetlistsShell from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsShell';
import SavedSetlistsSidebarEmpty from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsSidebarEmpty';
import SetlistViewSongList from '@/features/review_setlists/current_setlist/view/SetlistViewSongList';
import SetlistEmpty from '@/features/review_setlists/SetlistEmpty';
import type { ViewModeHeaderProps } from '@/features/review_setlists/current_setlist/view/SetlistViewModeHeader';
import FiltersProvider from '@/context/filters/FiltersProvider';
import type { SongType } from '@/types/SongType';
import useReview from '@/features/review_setlists/hooks/use_review/useReview';
import SetlistViewModeHeader from '@/features/review_setlists/current_setlist/view/SetlistViewModeHeader';

export interface SetlistViewModeProps {
  handleMode: (mode: ViewMode) => void;
  setlistData: SubmitSetlistType | undefined;
  setlistDuration: number;
  sidebarProps: SavedSetlistsListProps;
  getSongData: (songId: string) => SongType | undefined;
}

const SetlistViewMode = ({
  handleMode,
  setlistData,
  setlistDuration,
  sidebarProps,
}: SetlistViewModeProps) => {
  const navigate = useNavigate();

  const { removeSong, rows } = useReview();

  const headerProps = {
    onClick: () => navigate('/dash/create'),
    header: 'Setlists',
    buttonText: 'Create Setlist',
    header2:
      sidebarProps.setlists.length > 0
        ? 'Select a setlist to review.'
        : 'Create a setlist first.',
  };

  const viewHeader: ViewModeHeaderProps = {
    setlistDuration,
    setlistName: setlistData?.setlistName,
    handleMode,
    otherModes: ['edit', 'perform'],
  };

  return (
    <FiltersProvider>
      <section data-cy="view-page" className="flex min-h-0 flex-1 px-4">
        {sidebarProps.setlists.length > 0 ? (
          <SavedSetlistsShell headerProps={headerProps}>
            <SavedSetlistsList {...sidebarProps} />
          </SavedSetlistsShell>
        ) : (
          <SavedSetlistsShell headerProps={headerProps}>
            <SavedSetlistsSidebarEmpty />
          </SavedSetlistsShell>
        )}

        <div
          data-cy="view-page-content"
          className={`flex flex-8 flex-col border-x-2 border-b-2 border-border-bold ${!setlistData?.setlistId ? 'pointer-events-none grayscale-50' : ''}`}
        >
          <header className="flex items-center justify-center gap-4 bg-bg-main py-4 text-text-main">
            <h1 className="text-3xl font-semibold underline">
              Review your setlists
            </h1>
          </header>

          {setlistData && (
            <div
              id="setlist-view-song-list"
              className="flex min-h-0 flex-1 flex-col divide-y-2 divide-border-bold"
            >
              <SetlistViewModeHeader {...viewHeader} />
              
              {setlistData.setlistSongs.length > 0 ? (
                <SetlistViewSongList
                  rows={rows}
                  onRemove={removeSong}
                />
              ) : (
                <SetlistEmpty />
              )}
            </div>
          )}
          {!setlistData && <SetlistEmpty />}
        </div>
      </section>
    </FiltersProvider>
  );
};
export default SetlistViewMode;
