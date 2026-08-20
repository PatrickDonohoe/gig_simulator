import { useState } from 'react';

import useReview from '@/features/review_setlists/hooks/use_review/useReview';
import CurrentSetlist from '@/features/review_setlists/current_setlist/CurrentSetlist';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';

const ReviewSetlistsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('view');

  const {
    songsDisplayData,
    handleSetlist,
    sidebarSetlists,
    setlistData,
    setlistDuration,
  } = useReview();

  const sidebarProps: SavedSetlistsListProps = {
    handleSetlist,
    setlists: sidebarSetlists,
  };

  const handleMode = (mode: ViewMode) => setViewMode(mode);

  return (
    <div data-cy="page" className="flex flex-col min-h-0 flex-1">
      {/* TODO: Add a header, instructions for the page, and some decoration. */}
      <header className="flex justify-center items-center bg-bg-main gap-4 py-4 text-text-main">
        <h1 className="font-semibold text-3xl underline">Review your setlists</h1>
        <span className="text-xl">Select a setlist from the left to review or edit.</span>
      </header>

      <CurrentSetlist
        viewMode={viewMode}
        songsDisplayData={songsDisplayData || []}
        handleMode={handleMode}
        setlistData={setlistData}
        setlistDuration={setlistDuration}
        sidebarProps={sidebarProps}
      />
    </div>
  );
};
export default ReviewSetlistsPage;
