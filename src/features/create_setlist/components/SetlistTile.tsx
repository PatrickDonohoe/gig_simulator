import type { UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { useSortable } from '@dnd-kit/react/sortable';

import type { SetlistTileType } from '@/types/SetlistTileType';
import type { FormValues } from '../hooks/useSetlist';
import type { SongType } from '@/types/SongType';

/**
 * Reusable tile for the setlist that will include the draggable tile plus
 * transition time and any additional notes the user has left. The last tile(li)
 * will have a different notes section for closing remarks.
 */

export interface SetlistTileProps {
  field: FieldArrayWithId<FormValues, 'setlist'>;
  index: number;
  register: UseFormRegister<FormValues>;
  getSongDisplayDetails: (songId: string) => SetlistTileType;
  metaFilters: (keyof SongType)[];
}

const SetlistTile = ({
  field,
  index,
  register,
  getSongDisplayDetails,
  metaFilters,
}: SetlistTileProps) => {
  const { ref } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'setlist',
  });

  // Callback to master song state to fetch presentation layers cleanly
  const metadata: SetlistTileType = getSongDisplayDetails(field.songId);

  return (
    <section ref={ref} id="setlist_tile" className="flex flex-col gap-4">
      <h1>Song #{index + 1}</h1>
      <article
        id="setlist_article"
        className="flex flex-col gap-2 overflow-hidden rounded-xl border border-dark_amethyst lg:gap-4"
      >
        <h2 className="text-center">{metadata.title}</h2>

        <div id="attributes_container" className="wrap flex">
          {metaFilters.map((filter) => (
            <span key={filter}>{metadata[filter]}</span>
          ))}
        </div>
      </article>
      <div className="flex flex-col gap-2">
        <textarea
          id={field.id}
          placeholder="Add any notes here about your transition such as key change, instrument change, or something to share with the audience."
          className=""
          {...register(`setlist.${index}.notes`)}
        />
        <div className="flex flex-col gap-2">
          <h2>Enter a custom transition time if different from the default.</h2>
          <label>
            Enter minutes
            <input
              type="number"
              id="transition"
              {...register(`setlist.${index}.transitionTime.minutes`)}
            />
          </label>
          <label>
            Enter seconds
            <input
              type="number"
              id="transition"
              {...register(`setlist.${index}.transitionTime.seconds`)}
            />
          </label>
        </div>
      </div>
    </section>
  );
};
export default SetlistTile;
