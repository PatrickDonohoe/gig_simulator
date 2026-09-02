import { useState } from 'react';

import useReview from '@/features/review_setlists/hooks/use_review/useReview';
import CurrentSetlist from '@/features/review_setlists/current_setlist/CurrentSetlist';
import type { ViewMode } from '@/features/review_setlists/types/ViewMode';
import type { SavedSetlistsListProps } from '@/features/review_setlists/saved_setlists_sidebar/SavedSetlistsList';

const ReviewSetlistsPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('view');

  const {
    handleSetlist,
    sidebarSetlists,
    setlistData,
    setlistDuration,
    getSongData,
  } = useReview();

  const sidebarProps: SavedSetlistsListProps = {
    handleSetlist,
    setlists: sidebarSetlists,
  };

  const handleMode = (mode: ViewMode) => setViewMode(mode);

  return (
    <div data-cy="page" className="flex min-h-0 flex-1 flex-col">
      {/* TODO: Add a header, instructions for the page, and some decoration. */}
      <header className="flex items-center justify-center gap-4 bg-bg-main py-4 text-text-main">
        <h1 className="text-3xl font-semibold underline">
          Review your setlists
        </h1>
        <span className="text-xl">
          Select a setlist from the left to review or edit.
        </span>
      </header>

      <CurrentSetlist
        viewMode={viewMode}
        getSongData={getSongData}
        handleMode={handleMode}
        setlistData={setlistData}
        setlistDuration={setlistDuration}
        sidebarProps={sidebarProps}
      />
    </div>
  );
};
export default ReviewSetlistsPage;
