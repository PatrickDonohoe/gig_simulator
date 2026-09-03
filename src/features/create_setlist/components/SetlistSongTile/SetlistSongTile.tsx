import { useSortable } from '@dnd-kit/react/sortable';

import type { SongType } from '@/types/SongType';
import FilterAttribute from '../FilterAttribute';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import useFilters from '@/hooks/useFilters';
import type { SongTileProps } from '../../types/TileProps';

/**
 * Reusable tile for the setlist that will include the draggable tile plus
 * transition time and any additional notes the user has left. The last tile(li)
 * will have a different notes section for closing remarks.
 */

const SetlistSongTile = ({ field, index, commonTileProps }: SongTileProps) => {
  const { ref, isDragSource } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: ['song-item', 'trans-item'],
    group: 'setlist',
    // OptimisticSortingPlugin (default) live-mutates the DOM directly across
    // sortable groups to preview the reorder mid-drag. Combined with a
    // cross-group RHF state update on drop, that's a confirmed, currently
    // open dnd-kit bug (github.com/clauderic/dnd-kit/issues/1747,
    // /issues/1940) that crashes React's reconciliation with a removeChild
    // NotFoundError. Disabling it trades away the live "make room" preview
    // for reliability.
    plugins: [],
  });

  const { activeFilters } = useFilters();

  const { getSongDisplayDetails, onRemove } = commonTileProps;

  // Callback to master song state to fetch presentation layers cleanly
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
    <section
      ref={ref}
      id="setlist_tile"
      data-cy={`setlist-tile-${field.songId}`}
      className={`flex max-h-96 flex-col gap-4 overflow-hidden rounded-xl border-2 border-border-bold bg-accent p-2 text-text-main hover:border-border-subtle ${isDragSource ? 'hidden' : ''}`}
    >
      <div className="grid w-full grid-flow-col grid-cols-3">
        <h1 className="col-start-2 justify-self-center rounded-xl p-2 text-xl font-semibold text-bg-main underline">
          Song
        </h1>

        <button
          data-cy={`trash-button-${index}`}
          type='button'
          className="col-start-3 flex-none justify-self-end p-2 text-bg-main hover:text-border-subtle/50"
          onClick={() => onRemove(index)}
        >
          <TrashCan className="size-6 justify-self-end" />
        </button>
      </div>

      <article
        id="setlist_article"
        data-cy={`setlist-article-${index}`}
        className="flex flex-col justify-center gap-2 overflow-hidden rounded-xl border border-dark_amethyst bg-menu p-4 lg:gap-4"
      >
        <h2 className="text-center font-semibold">Title: {metadata.title}</h2>

        {/* The title filter/data is provided above. If filters besies the title are present, show them here. Otherwise, render nothing so that the title is centered vertically. */}
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
                data={formatters[f](metadata)}
              />
            ))}
          </div>
        )}
      </article>
    </section>
  );
};
export default SetlistSongTile;
