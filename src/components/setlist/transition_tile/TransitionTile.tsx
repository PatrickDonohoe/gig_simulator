import { useSortable } from '@dnd-kit/react/sortable';

import NumberInput from '@/components/NumberInput';
import type { TransitionTileProps } from '@/features/create_setlist/types/TileProps';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';

const TransitionTile = ({
  field,
  index,
  commonTileProps,
}: TransitionTileProps) => {
  const { ref, isDragSource } = useSortable({
    id: field.id,
    index,
    type: 'trans-item',
    accept: 'song-item',
    group: 'setlist',
    modifiers: [
      RestrictToElement.configure({
        element: document.getElementById('setlist-songlist'),
      }),
    ],
  });

  const { register, getValues, setValue, watch } = commonTileProps;
  return (
    <div
      data-cy={`transition-tile-${index}`}
      ref={ref}
      className="flex flex-col gap-2"
    >
      <textarea
        id={field.id}
        data-cy={`notes-${index}`}
        placeholder="Add any notes here about your transition such as key change, instrument change, or something to share with the audience."
        className={`rounded-xl border-2 border-dark_amethyst bg-menu p-2 focus:outline-border-bold ${isDragSource ? 'hidden' : ''}`}
        rows={3}
        defaultValue={field.notes}
        {...register(`setlist.${index}.notes`)}
      />

      <div className="flex flex-col gap-2 rounded-xl bg-menu p-2 ring-2 ring-deep_space_blue">
        <h3>Enter a custom transition time if different from the default.</h3>

        <NumberInput
          title="Enter Minutes"
          cy_id={`minutes-tran-${index}`}
          id="minutes"
          defaultValue={field.transitionTime.minutes}
          index={index}
          register={register}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
        />

        <NumberInput
          title="Enter Seconds"
          cy_id={`seconds-tran-${index}`}
          id="seconds"
          defaultValue={field.transitionTime.seconds}
          index={index}
          register={register}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
        />
      </div>
    </div>
  );
};
export default TransitionTile;
