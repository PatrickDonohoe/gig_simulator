import Between from '@icons/spacing-vertical-svgrepo-com.svg?react';
import type { TransitionType } from '@/features/create_setlist/types/SetlistRow';
import { secToDisplay } from '@/utils/add_time/addTimeDurations';

interface TransitionTileProps {
  tile: TransitionType;
  index: number;
}

const ViewTransitionTile = ({ tile, index }: TransitionTileProps) => {
  return (
    <article key={tile.transitionId} className="flex items-center gap-6 border-2 rounded-md border-text-main px-4 py-2 bg-menu">
      <Between className="size-8" />

      <div className="flex flex-col gap-2 border-2 border-border-bold bg-bg-main p-2">
        <p data-cy={`song-notes-${index}`}>
          {tile.notes ? (
            <>
              <strong>Notes: </strong> <span>{tile.notes}</span>
            </>
          ) : (
            'Click the edit button to add notes.'
          )}
        </p>
        <span data-cy="song-transition" className="text-center text-text-main">
          <strong>Transition Time:</strong> {'  '}
          {tile.transitionTime.minutes ?? '00'}:
          {tile.transitionTime.seconds ? secToDisplay(tile.transitionTime.seconds) : '00'}
        </span>
      </div>
    </article>
  );
};
export default ViewTransitionTile;
