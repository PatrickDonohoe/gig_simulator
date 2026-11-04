import type { TransitionType } from '@/features/create_setlist/types/SetlistRow';
import { durationToDisplay } from '@/utils/add_time/addTimeDurations';

interface PerformTransTileProps {
  transition: TransitionType;
}

// A slim connector between two songs rather than a card of its own.
const PerformanceTransitionTile = ({ transition }: PerformTransTileProps) => {
  return (
    <li
      data-cy={`perform-trans-${transition.transitionId}`}
      aria-label="Transition"
      className="flex items-center gap-3 px-4 py-1"
    >
      <span aria-hidden className="h-px flex-1 bg-accent/50" />
      <span className="flex-none font-semibold text-accent tabular-nums">
        <span aria-hidden>↓ </span>
        {durationToDisplay(transition.transitionTime)}
      </span>
      {transition.notes && (
        <p className="max-w-[60%] text-text-muted italic">{transition.notes}</p>
      )}
      <span aria-hidden className="h-px flex-1 bg-accent/50" />
    </li>
  );
};
export default PerformanceTransitionTile;
