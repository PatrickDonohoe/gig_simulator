import { useNavigate } from 'react-router';

import SetlistViewSongList, {
  type SetlistViewSongListProps,
} from '@/features/review_setlists/current_setlist/view/SetlistViewSongList';
import SavedSetlistsShell from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsShell';
import SavedSetlistsList, { type SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';
import SetlistEmpty from '@/features/review_setlists/SetlistEmpty';
import SavedSetlistsSidebarEmpty from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsSidebarEmpty';
import HeaderFilters, { type HeaderFilterProps } from '@/components/setlist/HeaderFilters';

interface SetlistViewPanelProps {
  isSongs: boolean;
  currentSongs: SetlistViewSongListProps;
  sidebarProps: SavedSetlistsListProps;
  filterProps: HeaderFilterProps;
}

const SetlistViewPanel = ({
  isSongs,
  currentSongs,
  sidebarProps,
  filterProps,
}: SetlistViewPanelProps) => {
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
    <section className="flex min-h-0 flex-1">
      {sidebarProps.setlists.length > 0 ? (
        <SavedSetlistsShell headerProps={headerProps}>
          <SavedSetlistsList {...sidebarProps} />
        </SavedSetlistsShell>
      ) : (
        <SavedSetlistsShell headerProps={headerProps}>
          <SavedSetlistsSidebarEmpty />
        </SavedSetlistsShell>
      )}

      <div className="flex flex-col flex-8">
        <HeaderFilters {...filterProps} />

        {isSongs ? <SetlistViewSongList {...currentSongs} /> : <SetlistEmpty />}</div>
    </section>
  );
};
export default SetlistViewPanel;
