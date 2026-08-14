import { useState } from 'react';

import useReview from '@/features/review_setlists/hooks/useReview';
import SetlistSidebar from '@/features/review_setlists/setlist_sidebar/SetlistSidebar';
import CurrentSetlist from '@/features/review_setlists/current_setlist/CurrentSetlist';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';

const ReviewSetlistsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('view');

  const {
    songsDisplayData,
    handleSetlist,
    sidebarSetlists,
    setlistData,
    setlistDuration,
  } = useReview();

  const handleMode = (mode: ViewMode) => setViewMode(mode);

  return (
    <div data-cy="page" className="flex min-h-0 flex-1">
      <SetlistSidebar
        handleSetlist={handleSetlist}
        setlists={sidebarSetlists}
      />

      {setlistData && songsDisplayData ? (
        <CurrentSetlist
          viewMode={viewMode}
          songsDisplayData={songsDisplayData}
          handleMode={handleMode}
          setlistData={setlistData}
          setlistDuration={setlistDuration}
        />
      ) : (
        <>show empty state</>
      )}
    </div>
  );
};
export default ReviewSetlistsPage;
