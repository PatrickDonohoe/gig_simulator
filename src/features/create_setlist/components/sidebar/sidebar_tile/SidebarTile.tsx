import { useSortable } from '@dnd-kit/react/sortable';

import type { FormValues } from '../../../hooks/useSetlist';
import type { FieldArrayWithId } from 'react-hook-form';
import type { CommonTileProps } from '../../../types/CommonTileProps';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';
import type { DurationInput } from '@/types/DurationInput';

export interface SidebarTileProps {
  field: FieldArrayWithId<FormValues, 'sidebar', 'id'>;
  index: number;
  commonTileProps: Omit<CommonTileProps, 'onClick'>;
}

const SidebarTile = ({ field, index, commonTileProps }: SidebarTileProps) => {
  const { ref } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'sidebar',
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
      id="sidebar_tile"
      data-cy="tile"
      className="flex max-h-18 w-full justify-between gap-2 overflow-hidden rounded-xl border border-border-bold bg-bg-main p-2 text-text-main"
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
export default SidebarTile;
