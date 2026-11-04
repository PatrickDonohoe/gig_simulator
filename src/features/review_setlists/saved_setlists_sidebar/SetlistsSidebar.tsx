import SidebarShell from '@/layouts/components/SidebarShell';
import SavedSetlistTile from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistTile';
import useReview from '@/features/review_setlists/hooks/useReview';

const SetlistsSidebar = () => {
  // TODO: get array of setlists
  const { sidebarSetlists } = useReview();

  const setlistHeader = {
    header: 'Setlists',
    buttonText: 'Create Setlist',
    header2:
      sidebarSetlists.length > 0
        ? 'Select a setlist to review.'
        : 'Create a setlist first.',
    address: '/dash/create',
  };
  return (
    <SidebarShell
      headerProps={setlistHeader}
      variant="nav"
      dataCy="setlists-sidebar"
    >
      <nav
        data-cy="setlists-list"
        aria-label="Saved setlists"
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-2 pr-2"
      >
        {sidebarSetlists.map((set) => (
          <SavedSetlistTile key={set.setlistId} set={set} />
        ))}
      </nav>
    </SidebarShell>
  );
};
export default SetlistsSidebar;
