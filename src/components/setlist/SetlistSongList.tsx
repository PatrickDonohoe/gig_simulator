import { useDroppable } from '@dnd-kit/react';
import type { FieldArrayWithId, UseFieldArrayInsert } from 'react-hook-form';

import SetlistSongTile from '@/features/create_setlist/components/SetlistSongTile/SetlistSongTile';
import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from '../../features/create_setlist/types/CommonTileProps';
import TransitionTile from '@/components/setlist/transition_tile/TransitionTile';
import AddTransition from '@/components/AddTransition';

export interface SongListProps {
  tiles: FieldArrayWithId<FormValues, 'setlist'>[];
  commonTileProps: CommonTileProps; // submit function passed also;
  setlistInsert: UseFieldArrayInsert<FormValues, 'setlist'>;
}

const SetlistSongList = ({
  tiles,
  commonTileProps,
  setlistInsert,
}: SongListProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist' });

  return (
    <div
      id="setlist-songlist"
      data-cy="setlist-songlist"
      ref={ref}
      className={`mx-6 flex flex-1 flex-col items-center overflow-y-auto border p-4 ${isDropTarget ? 'bg-golden_apricot' : 'bg-periwinkle'}`}
    >
      {tiles.length > 0 ? (
        <ul className="flex flex-col gap-4 lg:gap-6" data-cy="list">
          {tiles.map((t, index) => {
            if (t.kind === 'transition') {
              return (
                <TransitionTile
                  key={t.id}
                  field={t}
                  commonTileProps={commonTileProps}
                  index={index}
                />
              );
            }

            // A transition represents the gap after this song. Only offer to add
            // one when the next row isn't already a transition (end of list
            // counts as "no transition there").
            const nextIsTransition = tiles[index + 1]?.kind === 'transition';

            return (
              <div key={t.id} className="flex flex-col gap-2">
                <SetlistSongTile
                  field={t}
                  commonTileProps={commonTileProps}
                  index={index}
                />
                {!nextIsTransition && (
                  <AddTransition
                    dataCy={`add-transition-${index}`}
                    onClick={() =>
                      setlistInsert(index + 1, {
                        kind: 'transition',
                        transitionId: crypto.randomUUID(),
                        transitionTime: { hours: 0, minutes: 0, seconds: 0 },
                      })
                    }
                  />
                )}
              </div>
            );
          })}
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
