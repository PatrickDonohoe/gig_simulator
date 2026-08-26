import { useSortable } from '@dnd-kit/react/sortable';

import type { FormValues } from '../../../../../hooks/use_setlist/useSetlist';
import type { FieldArrayWithId } from 'react-hook-form';
import type { CommonTileProps } from '../../../types/CommonTileProps';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';
import type { DurationInput } from '@/types/DurationInput';

export interface SongLibraryTileProps {
  field: FieldArrayWithId<FormValues, 'sidebar', 'id'>;
  index: number;
  commonTileProps: Omit<CommonTileProps, 'onClick' | 'errors'>;
}

const SongLibraryTile = ({
  field,
  index,
  commonTileProps,
}: SongLibraryTileProps) => {
  const { ref, isDragSource } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'sidebar',
    // OptimisticSortingPlugin (default) live-mutates the DOM directly across
    // sortable groups to preview the reorder mid-drag. Combined with a
    // cross-group RHF state update on drop, that's a confirmed, currently
    // open dnd-kit bug (github.com/clauderic/dnd-kit/issues/1747,
    // /issues/1940) that crashes React's reconciliation with a removeChild
    // NotFoundError. Disabling it trades away the live "make room" preview
    // for reliability.
    plugins: [],
  });

  // bundle of props passed down from useSetlist
  const { getSongDisplayDetails, register, onRemove } = commonTileProps;

  // data about each song
  const metadata = getSongDisplayDetails(field.songId);

  // song duration broken down into hours, minutes, seconds format.
  const songLength: DurationInput = timeBreakdown(metadata?.duration ?? 0);

  return (
    <article
      ref={ref}
      id={`sidebar_tile_${index}`}
      data-cy="tile"
      className={`flex max-h-18 w-full justify-between gap-2 overflow-hidden rounded-xl border border-border-bold bg-bg-main p-2 text-text-main ${isDragSource ? 'hidden' : ''}`}
    >
      <input type="hidden" {...register(`sidebar.${index}.songId`)} />
      <span data-cy="song_title" className="truncate underline">
        {metadata?.title ?? 'unknown'}
      </span>
      <div className="flex flex-col items-center gap-1 md:flex-row">
        <span>
          {formatDuration(songLength.minutes)}:
          {formatDuration(songLength.seconds)}
        </span>

        <button
          data-cy="remove"
          className="flex-none p-2"
          onClick={() => onRemove(index)}
        >
          <TrashCan className="size-4" />
        </button>
      </div>
    </article>
  );
};
export default SongLibraryTile;
