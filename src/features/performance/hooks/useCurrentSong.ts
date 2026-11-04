import { useSearchParams } from 'react-router';

import {
  clampPosition,
  parsePosition,
} from '@/features/performance/utils/songPosition';

// The current song position lives in the URL (?song=3) so a refresh mid-set
// returns to the same song. URL updates replace the history entry, so the back
// button leaves the perform view instead of stepping back through songs.
const useCurrentSong = (songCount: number) => {
  const [params, setParams] = useSearchParams();
  // Passes the URL song position and total song count to sanitize and validate before use.
  const current = parsePosition(params.get('song'), songCount);

  // Sets new url search params as the given position after validation.
  const goTo = (position: number) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('song', String(clampPosition(position, songCount)));
        return next;
      },
      { replace: true },
    );

  return {
    current,
    isComplete: current > songCount,
    goTo,
    next: () => goTo(current + 1),
    prev: () => goTo(current - 1),
  };
};

export default useCurrentSong;
