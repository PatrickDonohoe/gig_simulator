import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import SetlistPerformMode from '@/features/performance/SetlistPerformMode';

// The performance view for the chosen setlist. It is a route rather than a modal,
// so it fills the whole screen on mobile and the content section (below the app
// header) from the md breakpoint up.

const PerformancePage = () => {
  const navigate = useNavigate();
  const close = () => navigate('..');

  // A plain element doesn't close on Escape like a <dialog> does, so add it back.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('..');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <section
      data-cy="perform-view"
      aria-labelledby="perform-title"
      className="fixed inset-0 z-50 flex flex-col bg-bg-main text-text-main md:static md:z-auto md:min-h-0 md:flex-1"
    >
      <header className="flex items-center justify-between border-b border-border-bold p-4">
        <h2 id="perform-title">Perform Setlist</h2>

        {/* returns to the saved setlist's review page */}
        <button
          id="close-perform"
          type="button"
          onClick={close}
          aria-label="Close"
          className="-my-1 flex-none px-2 py-1"
        >
          X
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <SetlistPerformMode />
      </div>
    </section>
  );
};
export default PerformancePage;
