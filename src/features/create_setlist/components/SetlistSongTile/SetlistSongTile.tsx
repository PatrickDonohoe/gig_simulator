import type { SongType } from '@/types/SongType';
import FilterAttribute from '../FilterAttribute';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import useFilters from '@/hooks/useFilters';
import type { SongTileProps } from '../../types/TileProps';
import { useSetlistRowTile } from '@/hooks/use_setlist/useDndTile';
import DropEdge from '@/components/setlist/DropEdge';

/**
 * A song row in the setlist: draggable to reorder, or back to the library to
 * remove. Also a drop target so a library song can land next to it.
 */

const SetlistSongTile = ({ field, index, commonTileProps }: SongTileProps) => {
  const { ref, dragging, closestEdge } = useSetlistRowTile<HTMLElement>({
    rowId: field.id,
    index,
    rowKind: 'song',
  });

  const { activeFilters } = useFilters();
  const { getSongDisplayDetails, onRemove } = commonTileProps;

  const metadata: SongType = getSongDisplayDetails(field.songId) ?? {
    id: field.songId,
    title: 'unknown',
    artist: '',
    genre: '',
    key: '',
    tempo: '',
    instrumentation: [],
    duration: 0,
  };

  const formatters: Record<keyof SongType, (s: SongType) => string> = {
    id: (s) => s.id,
    title: (s) => s.title,
    artist: (s) => s.artist,
    genre: (s) => s.genre,
    key: (s) => s.key,
    tempo: (s) => s.tempo,
    duration: (s) => {
      const { hours, minutes, seconds } = timeBreakdown(s.duration);
      return hours && hours > 0
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
    },
    instrumentation: (s) => s.instrumentation.join(', '),
  };

  return (
    <div className="relative w-full">
      <DropEdge edge={closestEdge} />
      <section
        ref={ref}
        data-cy={`setlist-tile-${field.songId}`}
        className={`flex max-h-96 flex-col gap-4 overflow-hidden rounded-xl border-2 border-border-bold bg-accent p-2 text-text-main hover:border-border-subtle ${dragging ? 'opacity-40' : ''}`}
      >
        <div className="grid w-full grid-flow-col grid-cols-3">
          <h1 className="col-start-2 justify-self-center rounded-xl p-2 text-xl font-semibold text-bg-main underline">
            Song
          </h1>

          <button
            data-cy={`trash-button-${index}`}
            type="button"
            className="col-start-3 flex-none justify-self-end p-2 text-bg-main hover:text-border-subtle/50"
            onClick={() => onRemove(index)}
          >
            <TrashCan className="size-6 justify-self-end" />
          </button>
        </div>

        <article
          data-cy={`setlist-article-${index}`}
          className="flex flex-col justify-center gap-2 overflow-hidden rounded-xl border border-dark_amethyst bg-menu p-4 lg:gap-4"
        >
          <h2 className="text-center font-semibold">Title: {metadata.title}</h2>

          {activeFilters.length > 0 && (
            <div
              data-cy="att_container"
              className="flex flex-wrap gap-2"
            >
              {activeFilters.map((f) => (
                <FilterAttribute
                  key={f}
                  label={f}
                  data={formatters[f](metadata)}
                />
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
};
export default SetlistSongTile;
