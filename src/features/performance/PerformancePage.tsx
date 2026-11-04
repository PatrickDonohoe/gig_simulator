import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import SetlistPerformMode from '@/features/performance/SetlistPerformMode';
import usePerformSetlist from '@/features/performance/hooks/usePerformSetlist';
import PerformControls from '@/features/performance/components/PerformControls';
import useCurrentSong from '@/features/performance/hooks/useCurrentSong';
import { secToRuntime } from '@/utils/add_time/addTimeDurations';

// Keys to go forward one song.
const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown', 'PageDown']);
// Keys to go back one song.
const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'PageUp']);

// The performance view for the chosen setlist. It is a route rather than a modal,
// so it fills the whole screen on mobile and the content section (below the app
// header) from the md breakpoint up.

const PerformancePage = () => {
  const navigate = useNavigate();
  const close = () => navigate('..');
  const { name, tiles, songCount, runtimeSeconds } = usePerformSetlist();
  const { current, isComplete, goTo, next, prev } = useCurrentSong(songCount);

  // A plain element doesn't close on Escape like a <dialog> does, so add it back.
  // Arrow and Page keys move between songs; Page Up/Down are what most
  // bluetooth page-turner pedals send.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // If it is one of these, don't do anything.
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      // If it is escape, go back one page in history.
      if (e.key === 'Escape') {
        navigate('..');
        // If the key pressed is in next keys, advance one song.
      } else if (NEXT_KEYS.has(e.key)) {
        e.preventDefault();
        next();
        // If the key pressed is in prev keys, go back one song.
      } else if (PREV_KEYS.has(e.key)) {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, next, prev]);

  return (
    <section
      data-cy="perform-view"
      aria-labelledby="perform-title"
      className="fixed inset-0 z-50 flex flex-col bg-bg-main text-text-main md:static md:z-auto md:min-h-0 md:flex-1"
    >
      <header className="flex items-center justify-between gap-4 border-b border-border-bold px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent uppercase">
            Performing
          </p>
          <h2 id="perform-title" className="truncate text-xl font-bold">
            {name}
          </h2>
          <p data-cy="perform-summary" className="text-sm text-text-muted">
            {songCount} {songCount === 1 ? 'song' : 'songs'} ·{' '}
            {secToRuntime(runtimeSeconds)}
          </p>
        </div>

        {/* returns to the saved setlist's review page */}
        <button
          id="close-perform"
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex-none rounded-lg p-2 hover:bg-bg-surface"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <SetlistPerformMode
          tiles={tiles}
          current={current}
          isComplete={isComplete}
          onSelect={goTo}
        />
      </div>

      <PerformControls
        current={current}
        songCount={songCount}
        isComplete={isComplete}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
};
export default PerformancePage;
