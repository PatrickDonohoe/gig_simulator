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
    <SidebarShell headerProps={setlistHeader} title="Setlists">
      <div
        data-cy="list"
        className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto bg-primary p-2 text-text-main"
      >
        {sidebarSetlists.map((set) => (
          <SavedSetlistTile key={set.setlistId} set={set} />
        ))}
      </div>
    </SidebarShell>
  );
};
export default SetlistsSidebar;
