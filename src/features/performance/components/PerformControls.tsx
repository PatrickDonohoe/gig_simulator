interface PerformControlsProps {
  current: number;
  songCount: number;
  isComplete: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const buttonClasses =
  'flex-none rounded-xl bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40';

// Large prev/next buttons, sized for a thumb or a quick tap mid-song.
const PerformControls = ({
  current,
  songCount,
  isComplete,
  onPrev,
  onNext,
}: PerformControlsProps) => {
  const isLast = current === songCount;

  return (
    <nav
      aria-label="Song controls"
      className="flex items-center justify-between gap-4 border-t border-border-bold px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <button
        id="prev-song"
        type="button"
        onClick={onPrev}
        disabled={current <= 1}
        className={buttonClasses}
      >
        Prev
      </button>

      <p
        data-cy="song-progress"
        aria-live="polite" // Polite waits until the user is done with their current action
        className="text-center font-semibold text-text-muted tabular-nums"
      >
        {isComplete ? 'Set complete' : `Song ${current} of ${songCount}`}
      </p>

      <button
        id="next-song"
        type="button"
        onClick={onNext}
        disabled={isComplete || songCount === 0}
        className={buttonClasses}
      >
        {isLast ? 'Finish' : 'Next'}
      </button>
    </nav>
  );
};
export default PerformControls;
