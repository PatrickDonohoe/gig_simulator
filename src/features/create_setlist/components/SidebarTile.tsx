import { useSortable } from '@dnd-kit/react/sortable';

import type { FormValues } from '../hooks/useSetlist';
import type { FieldArrayWithId } from 'react-hook-form';
import type { CommonTileProps } from '../types/CommonTileProps';

export interface SidebarTileProps {
  field: FieldArrayWithId<FormValues, 'sidebarPool', 'id'>;
  index: number;
  commonTileProps: CommonTileProps;
}

const SidebarTile = ({
  field,
  index,
  commonTileProps,
}: SidebarTileProps) => {
  const { ref } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'sidebar',
  });

  const { getSongDisplayDetails, register } = commonTileProps;

  const metadata = getSongDisplayDetails(field.songId);

  return (
    <article
      id="sidebar_tile"
      data-cy='tile'
      ref={ref}
      className="overflow-hidden rounded-xl border border-dark_amethyst p-2 bg-white"
    >
      <input type="hidden" {...register(`sidebarPool.${index}.songId`)} />
      <span className='underline'>{metadata?.title}</span>
    </article>
  );
};
export default SidebarTile;
