import { useDroppable } from '@dnd-kit/react';
import type { FieldArrayWithId } from 'react-hook-form';

import SetlistTile from '../SetlistTile/SetlistTile';
import type { FormValues } from '../../hooks/useSetlist';
import type { CommonTileProps } from '../../types/CommonTileProps';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 */

export interface SetlistProps {
  tiles: FieldArrayWithId<FormValues, 'setlist'>[];
  commonTileProps: CommonTileProps; // submit function passed also;
}

const Setlist = ({ tiles, commonTileProps }: SetlistProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist' });

  const { register } = commonTileProps;
  return (
    <section
      id="setlist"
      data-cy="setlist"
      className={`flex h-full flex-col gap-2 pb-2`}
    >
      <header
        data-cy="title-container"
        className="flex items-center justify-center bg-baby_blue_ice py-4"
      >
        <div className="flex items-center justify-between">
          <input
            data-cy="title"
            type="text"
            className="rounded-xl border border-midnight_violet bg-periwinkle p-2"
            placeholder="New Setlist #1"
            {...register('setlistName')}
          />

          {/* TODO: Submit button needed here */}
        </div>
      </header>

      <div className="mx-6 flex flex-1 flex-col items-center overflow-y-auto rounded-xl border">
        {tiles.length > 0 ? (
          <ul
            className={`flex flex-col gap-4 lg:gap-6 ${isDropTarget ? 'bg-golden_apricot' : 'flex-1 bg-periwinkle'}`}
            data-cy="list"
            ref={ref}
          >
            {tiles.map((t, index) => (
              <SetlistTile
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
    </section>
  );
};
export default Setlist;
