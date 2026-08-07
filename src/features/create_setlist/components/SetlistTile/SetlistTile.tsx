import { useSortable } from '@dnd-kit/react/sortable';

import type { SongType } from '@/types/SongType';
import FilterAttribute from '../FilterAttribute';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import type { TileProps } from '../../types/TileProps';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import NumberInput from '@/components/NumberInput';

/**
 * Reusable tile for the setlist that will include the draggable tile plus
 * transition time and any additional notes the user has left. The last tile(li)
 * will have a different notes section for closing remarks.
 */

export type SetlistTileProps = TileProps & { index: number };

const SetlistTile = ({ field, index, commonTileProps }: SetlistTileProps) => {
  const { ref } = useSortable({
    id: field.id,
    index,
    type: 'song-item',
    accept: 'song-item',
    group: 'setlist',
  });

  const {
    register,
    getValues,
    setValue,
    getSongDisplayDetails,
    activeFilters,
    onRemove,
  } = commonTileProps;

  // Callback to master song state to fetch presentation layers cleanly
  const metadata: SongType = getSongDisplayDetails(field.songId) ?? {
    id: field.songId,
    title: 'unknown',
    artist: '',
    genre: '',
    key: '',
    tempo: '',
    instrumentation: [],
    duration: 0,
  };

  const formatters: Record<keyof SongType, (s: SongType) => string> = {
    id: (s) => s.id,
    title: (s) => s.title,
    artist: (s) => s.artist,
    genre: (s) => s.genre,
    key: (s) => s.key,
    tempo: (s) => s.tempo,
    duration: (s) => {
      const { hours, minutes, seconds } = timeBreakdown(s.duration);
      return hours && hours > 0
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
    },
    instrumentation: (s) => s.instrumentation.join(', '),
  };

  return (
    <section
      ref={ref}
      id="setlist_tile"
      data-cy="tile"
      className="flex max-h-96 flex-col gap-4 overflow-hidden rounded-xl border-2 border-border-bold bg-accent p-2 text-text-main hover:border-border-subtle"
    >
      <div className="grid w-full grid-flow-col grid-cols-3">
        <h1 className="bg-wild_strawberry/20 col-start-2 justify-self-center rounded-xl p-2 text-2xl font-semibold text-bg-main underline">
          Song #{index + 1}
        </h1>

        <button
          className="col-start-3 flex-none p-2 text-bg-main hover:text-border-subtle/50"
          onClick={() => onRemove(index)}
        >
          <TrashCan className="size-8 justify-self-end" />
        </button>
      </div>

      <article
        id="setlist_article"
        data-cy="article"
        className="flex flex-col justify-center gap-2 overflow-hidden rounded-xl border border-dark_amethyst bg-menu p-4 lg:gap-4"
      >
        <h2 className="text-center font-semibold">Title: {metadata.title}</h2>

        {/* The title filter/data is provided above. If filters besies the title are present, show them here. Otherwise, render nothing so that the title is centered vertically. */}
        {activeFilters.length > 0 && (
          <div
            id="attributes_container"
            data-cy="att_container"
            className="flex flex-wrap gap-2"
          >
            {activeFilters.map((f) => (
              <FilterAttribute
                key={f}
                label={f}
                data={formatters[f](metadata)}
              />
            ))}
          </div>
        )}
      </article>

      <div className="flex flex-col gap-2">
        <textarea
          id={field.id}
          data-cy="notes"
          placeholder="Add any notes here about your transition such as key change, instrument change, or something to share with the audience."
          className="rounded-xl border-2 border-dark_amethyst bg-menu p-2 focus:outline-border-bold"
          rows={3}
          defaultValue={field.notes}
          {...register(`setlist.${index}.notes`)}
        />

        <div className="flex flex-col gap-2 rounded-xl bg-menu p-2 ring-2 ring-deep_space_blue">
          <h2>Enter a custom transition time if different from the default.</h2>

          <NumberInput
            title="Enter Minutes"
            cy_id="minutes_tran"
            id="minutes"
            defaultValue={field.transitionTime.minutes}
            index={index}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />

          <NumberInput
            title="Enter Seconds"
            cy_id="seconds_tran"
            id="seconds"
            defaultValue={field.transitionTime.seconds}
            index={index}
            register={register}
            getValues={getValues}
            setValue={setValue}
          />
        </div>
      </div>
    </section>
  );
};
export default SetlistTile;
