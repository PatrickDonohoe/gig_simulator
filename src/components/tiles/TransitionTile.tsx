import { useState } from 'react';
import { useWatch } from 'react-hook-form';

import type { TransitionTileProps } from '@/features/create_setlist/types/TileProps';
import TileShell from '@/components/tiles/TileShell';
import NumberInput from '@/components/NumberInput';
import { useSetlistRowTile } from '@/hooks/use_setlist/useDndTile';
import Chevron from '@icons/chevron-up-svgrepo-com.svg?react';
import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
import TrashCan from '@icons/trash-can-svgrepo-com.svg?react';
import { durationToDisplay } from '@/utils/add_time/addTimeDurations';

const TransitionTile = ({
  field,
  index,
  commonTileProps,
}: TransitionTileProps) => {
  const [open, setOpen] = useState(false);
  const { ref, dragging, closestEdge } = useSetlistRowTile<HTMLElement>({
    rowId: field.id,
    index,
    rowKind: 'transition',
  });
  const { register, getValues, setValue, control, onRemove } = commonTileProps;

  // Reading the live form value so the summary updates after editing
  const notes = useWatch({ control, name: `setlist.${index}.notes` });
  const time = useWatch({ control, name: `setlist.${index}.transitionTime` });

  return (
    <TileShell
      label="Transition"
      dragRef={ref}
      dragging={dragging}
      closestEdge={closestEdge}
      actions={
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            {open ? (
              <Chevron className="size-6" />
            ) : (
              <Pencil className="size-6" />
            )}
          </button>
          <button type="button" onClick={() => onRemove(index)}>
            <TrashCan className="size-6" />
          </button>
        </>
      }
    >
      {open ? (
        <>
          <textarea
            id={field.id}
            autoFocus
            rows={3}
            {...register(`setlist.${index}.notes`)}
          />
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
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-left"
        >
          <p>
            {notes || <span className="text-text-muted">Add notes...</span>}
          </p>
          <p>
            <strong>Transition:</strong> {durationToDisplay(time)}
          </p>
        </button>
      )}
    </TileShell>
  );
};
export default TransitionTile;
