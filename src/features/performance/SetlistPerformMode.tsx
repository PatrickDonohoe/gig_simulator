import { useRouteLoaderData } from 'react-router';

import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import { useLibraryStore } from '@/stores/useLibraryStore';
import PerformSongTile from '@/features/performance/components/PerformSongTile';
import filterSetlistData from '@/features/performance/utils/filterSetlistData';
import PerformanceTransitionTile from '@/features/performance/components/PerformanceTransitionTile';

// Distraction-Free view
// Takes up content of page for desktop and whole screen for mobile.
// Consider hamburger button in corner to open sidebar for mobile.
// Right Sidebar can include controls for performance such as next song, pause, etc.
// Consider how to make right sidebar toggle visibility. Include fade animation.
// Presentation of songs and transitions should be simple and clear.
// Create or modify existing templates for songs and transitions.

const SetlistPerformMode = () => {
  // uses setlist data retrieved in DashRoutes from setlist id in the URL
  const saved = useRouteLoaderData('setlist') as SubmitSetlistType;
  const librarySongs = useLibraryStore((s) => s.librarySongs);
  const setlistData = filterSetlistData(saved.setlistSongs, librarySongs);

  return (
    <div id="performance-page" className="bg-bg-main text-text-main">
      <ul id="tile-list">
        {setlistData.map((tile, index) =>
          tile.kind === 'transition' ? (
            <PerformanceTransitionTile key={index} transition={tile} />
          ) : !tile.song ? (
            <li key={index}>Data unavailable</li>
          ) : (
            <PerformSongTile key={index} song={tile.song} />
          ),
        )}
      </ul>
    </div>
  );
};
export default SetlistPerformMode;
