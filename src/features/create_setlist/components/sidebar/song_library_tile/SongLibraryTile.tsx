import type { SongType } from '@/types/SongType';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';
import type { DurationInput } from '@/types/DurationInput';
import { useLibraryTile } from '@/hooks/use_setlist/useDndTile';

export interface SongLibraryTileProps {
  song: SongType;
}

const SongLibraryTile = ({ song }: SongLibraryTileProps) => {
  const { ref, dragging } = useLibraryTile<HTMLElement>(song.id);

  const songLength: DurationInput = timeBreakdown(song.duration ?? 0);

  return (
    <article
      ref={ref}
      data-cy="tile"
      data-song-id={song.id}
      className={`flex max-h-18 w-full cursor-grab justify-between gap-2 overflow-hidden rounded-xl border border-border-bold bg-bg-main p-2 text-text-main ${dragging ? 'opacity-40' : ''}`}
    >
      <span data-cy="song_title" className="truncate underline">
        {song.title || 'unknown'}
      </span>
      <span>
        {formatDuration(songLength.minutes)}:
        {formatDuration(songLength.seconds)}
      </span>
    </article>
  );
};
export default SongLibraryTile;
