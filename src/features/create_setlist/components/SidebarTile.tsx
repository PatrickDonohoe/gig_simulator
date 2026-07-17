import { useSortable } from '@dnd-kit/react/sortable';

import type { FormValues } from '../hooks/useSetlist';
import type { FieldArrayWithId } from 'react-hook-form';
import type { CommonTileProps } from '../types/CommonTileProps';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';

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

  const { getSongDisplayDetails, register, onRemove } = commonTileProps;

  const metadata = getSongDisplayDetails(field.songId);

  return (
    <article
      ref={ref}
      id="sidebar_tile"
      data-cy="tile"
      className="flex w-full overflow-hidden rounded-xl border border-dark_amethyst bg-white p-2"
    >
      <div data-cy="draggable" className="flex items-center justify-between">
        <input type="hidden" {...register(`sidebar.${index}.songId`)} />
        <span data-cy="song_title" className="underline">
          {metadata?.title ?? 'unknown'}
        </span>
      </div>

      <button
        data-cy="remove"
        className="flex-none p-2"
        onClick={() => onRemove(index)}
      >
        <TrashCan className="size-4" />
      </button>
    </article>
  );
};
export default SidebarTile;
