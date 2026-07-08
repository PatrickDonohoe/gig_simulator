import { useSortable } from '@dnd-kit/react/sortable';

import type { FormValues } from '../hooks/useSetlist';
import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import type { SetlistTileType } from '@/types/SetlistTileType';

export interface SidebarTileProps {
  field: FieldArrayWithId<FormValues, 'sidebarPool', 'id'>;
  index: number;
  register: UseFormRegister<FormValues>;
  getSongDisplayDetails: (songId: string) => SetlistTileType; // maybe SongType
}

const SidebarTile = ({
  field,
  index,
  register,
  getSongDisplayDetails,
}: SidebarTileProps) => {
  const { ref } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'sidebar',
  });

  const metadata = getSongDisplayDetails(field.songId);

  return (
    <article
      id="sidebar_tile"
      data-cy='tile'
      ref={ref}
      className="overflow-hidden rounded-xl border border-dark_amethyst"
    >
      <input type="hidden" {...register(`sidebarPool.${index}.songId`)} />
      <span>{metadata?.title}</span>
    </article>
  );
};
export default SidebarTile;
