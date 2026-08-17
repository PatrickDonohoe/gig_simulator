import { useDroppable } from '@dnd-kit/react';
import type { FieldArrayWithId } from 'react-hook-form';

import SetlistTile from '../SetlistTile/SetlistTile';
import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from '../../types/CommonTileProps';
import SetlistHeader from '@/components/SetlistHeader';
import SetlistShell from '@/layouts/components/SetlistShell';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 */

export interface SetlistProps {
  tiles: FieldArrayWithId<FormValues, 'setlist'>[];
  commonTileProps: CommonTileProps; // submit function passed also;
  setlistDuration: number;
}

const Setlist = ({ tiles, commonTileProps, setlistDuration }: SetlistProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist' });
  const { register, onClick, ...rest } = commonTileProps;

  return (
    <SetlistShell>
      <SetlistHeader {...rest} setlistDuration={setlistDuration}>
        <input
          data-cy="title"
          type="text"
          className="grow rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName')}
        />
        <button
          data-cy="submit"
          type="submit"
          className="flex flex-3 flex-row items-center justify-center gap-2 rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent lg:text-lg"
          onClick={onClick}
        >
          <span>+</span> <span>Save Setlist</span>
        </button>
      </SetlistHeader>
      <div
        ref={ref}
        className={`mx-6 flex flex-1 flex-col items-center overflow-y-auto rounded-xl border p-4 ${isDropTarget ? 'bg-golden_apricot' : 'bg-periwinkle'}`}
      >
        {tiles.length > 0 ? (
          <ul className="flex flex-col gap-4 lg:gap-6" data-cy="list">
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
    </SetlistShell>
  );
};
export default Setlist;
