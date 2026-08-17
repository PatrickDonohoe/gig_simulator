import type { FieldArrayWithId } from 'react-hook-form';

import type { FormValues } from '@/features/create_setlist/hooks/use_setlist/useSetlist';
import SidebarTile, {
  type SidebarTileProps,
} from '@/features/create_setlist/components/sidebar/sidebar_tile/SidebarTile';

export interface LibraryProps {
  tiles: FieldArrayWithId<FormValues, 'sidebar'>[];
  common: SidebarTileProps['commonTileProps'];
}

const Library = ({ tiles, common }: LibraryProps) => {
  return (
    // <ul
    //   id="work_tile_list"
    //   data-cy="work_tile_list"
    //   className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto p-4"
    // >
    tiles.map((t, index) => (
      <SidebarTile
        key={t.id}
        field={t}
        commonTileProps={common}
        index={index}
      />
    ))
    // </ul>
  );
};
export default Library;
