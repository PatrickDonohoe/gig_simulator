import PerformSongTile from '@/features/performance/components/PerformSongTile';
import PerformanceTransitionTile from '@/features/performance/components/PerformanceTransitionTile';
import type { PerformTile } from '@/features/performance/hooks/usePerformSetlist';
import { songStatus } from '@/features/performance/utils/songPosition';

interface SetlistPerformModeProps {
  tiles: PerformTile[];
  current: number;
  isComplete: boolean;
  onSelect: (position: number) => void;
}

/**
 * Displays an intermixed list of all songs and transitions in the setlist.
 *
 * @param tiles The array of both complete song data and transition data.
 * @param current The index of the current song.
 * @param isComplete Handles the display of the "Set Complete" message at the
 *   end.
 * @param onSelect Sets the clicked tile to current.
 * @returns The setlist and complete message when isComplete is true.
 */

const SetlistPerformMode = ({
  tiles,
  current,
  isComplete,
  onSelect,
}: SetlistPerformModeProps) => {
  return (
    <div
      id="performance-page"
      className="mx-auto w-full max-w-3xl text-text-main"
    >
      <ul id="tile-list" className="flex flex-col gap-2">
        {tiles.map((tile, index) =>
          tile.kind === 'transition' ? (
            <PerformanceTransitionTile
              key={tile.transitionId}
              transition={tile}
            />
          ) : (
            <PerformSongTile
              key={`${tile.songId}-${index}`}
              song={tile.song}
              position={tile.position}
              status={songStatus(tile.position, current)}
              onSelect={onSelect}
            />
          ),
        )}
      </ul>

      {isComplete && (
        <p
          data-cy="set-complete"
          className="mt-6 text-center text-2xl font-bold text-accent"
        >
          Set complete!
        </p>
      )}
    </div>
  );
};
export default SetlistPerformMode;
