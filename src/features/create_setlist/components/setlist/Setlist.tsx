import { useDroppable } from '@dnd-kit/react';

import SetlistTile, { type TileProps } from '../SetlistTile/SetlistTile';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 */

export interface SetlistProps {
  tiles: TileProps[];
}

const Setlist = ({ tiles }: SetlistProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist' });
  return (
    <section
      id="setlist"
      data-cy="setlist"
      className={`flex h-full flex-col gap-2 pb-2`}
    >
      <div
        data-cy="title-container"
        className="flex items-center justify-center bg-baby_blue_ice py-4"
      >
        <h1
          data-cy="title"
          className="rounded-xl border border-midnight_violet bg-periwinkle p-2"
        >
          New Setlist
        </h1>
      </div>

      <div className="mx-6 flex flex-1 flex-col items-center overflow-y-auto rounded-xl border">
        {tiles.length > 0 ? (
          <ul
            className={`flex flex-col gap-4 lg:gap-6 ${isDropTarget ? 'bg-golden_apricot' : 'flex-1 bg-periwinkle'}`}
            data-cy="list"
            ref={ref}
          >
            {tiles.map((t, index) => (
              <SetlistTile key={t.field.id} {...t} index={index} />
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
