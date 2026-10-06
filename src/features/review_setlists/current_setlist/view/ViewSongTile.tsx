import Trash from '@icons/trash-can-svgrepo-com.svg?react';
import FilterAttribute from '@/features/create_setlist/components/FilterAttribute';
import useFilters from '@/hooks/useFilters';
import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import type { SongRowType } from '@/features/create_setlist/types/SetlistRow';

interface ViewSongTileProps {
  song: SongRowType & { song: SongType | undefined };
  onRemove: (songId: string) => void;
}

const formatters: Record<keyof SongType, (s: SongType) => string> = {
  id: (s) => s.id,
  rbid: (s) => s.rbid ?? '',
  title: (s) => s.title,
  artists: (s) => s.artists,
  key: (s) => s.key,
  mode: (s) => s.mode,
  tempo: (s) => String(s.tempo),
  duration: (s) => {
    const { hours, minutes, seconds } = timeBreakdown(s.duration);
    return hours && hours > 0
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  },
  instrumentation: (s) => s.instrumentation.join(', '),
  upc: (s) => s.upc ?? '',
};

const ViewSongTile = ({ song, onRemove }: ViewSongTileProps) => {
  const { activeFilters } = useFilters();

  
  return (
    <>
      <div className="grid grid-cols-3 items-center">
        <h2 id="song-title" className="col-span-2 text-center font-semibold">
          Title: {song.song?.title ?? 'Unavailable'}
        </h2>

        <button
          className="col-start-3 flex-none justify-self-end p-1"
          onClick={() => onRemove(song.songId)}
        >
          <Trash className="size-6" />
        </button>
      </div>

      {/* The title filter/data is provided above. If filters other than the title are present, show them here. Otherwise, render nothing so that the title is centered vertically. */}
      {activeFilters.length > 0 && (
        <div
          id="attributes_container"
          data-cy="att_container"
          className="flex flex-wrap gap-2"
        >
          {activeFilters.map((f) => (
            <FilterAttribute
              key={f}
              label={f}
              data={song.song ? formatters[f](song.song) : 'Unavailable'}
            />
          ))}
        </div>
      )}
    </>
  );
};
export default ViewSongTile;
