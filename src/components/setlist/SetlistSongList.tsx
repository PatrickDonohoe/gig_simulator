import { useDroppable } from '@dnd-kit/react';
import type { FieldArrayWithId } from 'react-hook-form';

import SetlistSongTile from '@/features/create_setlist/components/SetlistSongTile/SetlistSongTile';
import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from '../../features/create_setlist/types/CommonTileProps';

export interface SongListProps {
  tiles: FieldArrayWithId<FormValues, 'setlist'>[];
  commonTileProps: CommonTileProps; // submit function passed also;
}

const SetlistSongList = ({
  tiles,
  commonTileProps,
}: SongListProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist' });

  return (
    <div
      ref={ref}
      className={`mx-6 flex flex-1 flex-col items-center overflow-y-auto rounded-xl border p-4 ${isDropTarget ? 'bg-golden_apricot' : 'bg-periwinkle'}`}
    >
      {tiles.length > 0 ? (
        <ul className="flex flex-col gap-4 lg:gap-6" data-cy="list">
          {tiles.map((t, index) => (
            <SetlistSongTile
              key={t.id}
              field={t}
              commonTileProps={commonTileProps}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <div
          data-cy="setlist-fallback"
          className="flex flex-1 flex-col items-center justify-center"
        >
          <h2
            data-cy="fallback-title"
            className="flex h-full items-center justify-center text-center"
          >
            Drag songs from your library to make a setlist.
          </h2>
        </div>
      )}
    </div>
  );
};
export default SetlistSongList;
