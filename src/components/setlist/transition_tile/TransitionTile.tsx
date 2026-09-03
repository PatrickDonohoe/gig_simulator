import NumberInput from '@/components/NumberInput';
import type { TransitionTileProps } from '@/features/create_setlist/types/TileProps';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import { useSetlistRowTile } from '@/hooks/use_setlist/useDndTile';
import DropEdge from '@/components/setlist/DropEdge';

const TransitionTile = ({
  field,
  index,
  commonTileProps,
}: TransitionTileProps) => {
  const { ref, dragging, closestEdge } = useSetlistRowTile<HTMLDivElement>({
    rowId: field.id,
    index,
    rowKind: 'transition',
  });

  const { register, getValues, setValue, control, onRemove } = commonTileProps;

  return (
    <div className="relative w-full">
      <DropEdge edge={closestEdge} />
      <div
        ref={ref}
        data-cy={`transition-tile-${index}`}
        className={`flex flex-col gap-2 rounded-md border-2 border-border-bold bg-bg-main p-2 ${dragging ? 'opacity-40' : ''}`}
      >
        <div className="grid w-full grid-flow-col grid-cols-3">
          <h1 className="col-start-2 justify-self-center rounded-xl p-2 text-xl font-semibold text-text-main underline">
            Transition
          </h1>
          <button
            className="col-start-3 flex-none justify-self-end p-2 text-text-main hover:text-border-subtle"
            type="button"
            onClick={() => onRemove(index)}
          >
            <TrashCan className="size-6 justify-self-end" />
          </button>
        </div>
        <textarea
          id={field.id}
          data-cy={`notes-${index}`}
          placeholder="Add any notes here about your transition such as key change, instrument change, or something to share with the audience."
          className="w-full rounded-xl border-2 border-dark_amethyst bg-menu p-2 focus:outline-border-bold"
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
            control={control}
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
            control={control}
          />
        </div>
      </div>
    </div>
  );
};
export default TransitionTile;
