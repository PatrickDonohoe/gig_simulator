import type { FieldArrayWithId } from 'react-hook-form';

import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import SongLibraryTile, {
  type SongLibraryTileProps,
} from '@/features/create_setlist/components/sidebar/song_library_tile/SongLibraryTile';

export interface SongLibraryListProps {
  tiles: FieldArrayWithId<FormValues, 'sidebar'>[];
  common: SongLibraryTileProps['commonTileProps'];
}

const SongLibraryList = ({ tiles, common }: SongLibraryListProps) => {
  return (
    // <ul
    //   id="work_tile_list"
    //   data-cy="work_tile_list"
    //   className="flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto p-4"
    // >
    tiles.map((t, index) => (
      <SongLibraryTile
        key={t.id}
        field={t}
        commonTileProps={common}
        index={index}
      />
    ))
    // </ul>
  );
};
export default SongLibraryList;
