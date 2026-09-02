import AddIcon from '@icons/add-square-svgrepo-com.svg?react';
import MinusIcon from '@icons/minus-square-svgrepo-com.svg?react';
import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import type { AddSongFormValues } from '../../hooks/useAddSong';

interface MultStackProps {
  label: string;
  fields: FieldArrayWithId<AddSongFormValues, 'instrumentation'>[];
  register: UseFormRegister<AddSongFormValues>;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const MultInputStack = ({
  label,
  fields,
  register,
  onAdd,
  onRemove,
}: MultStackProps) => {
  return (
    <label
      data-cy="mult_stack"
      className="flex flex-col gap-2 text-lg font-semibold text-text-main"
    >
      {label}:
      <div className="grid grid-cols-[1fr_3rem_3rem] gap-2 rounded-xl border border-border-bold p-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="col-span-full grid grid-flow-col grid-cols-subgrid"
          >
            <input
              id={`instrument-${index}`}
              data-cy="input"
              type="text"
              placeholder="e.g. drum set"
              className="rounded-lg border-2 border-border-bold bg-bg-main p-2 transition-all ease-in-out placeholder:text-text-muted hover:bg-accent focus:bg-bg-surface focus-visible:border-accent"
              {...register(`instrumentation.${index}.value`)}
            />
            <button
              data-cy="rmv_button"
              type="button"
              className="focus-visible:border-border-bold border-2 border-hidden flex-none place-self-center focus-visible:border-solid rounded-md focus-visible:outline-none"
              onClick={() => onRemove(index)}
            >
              <MinusIcon className="size-8" />
            </button>
            <button
              data-cy="add_button"
              type="button"
              onClick={onAdd}
              className="focus-visible:border-border-bold border-2 border-hidden flex-none place-self-center focus-visible:border-solid rounded-md focus-visible:outline-none"
            >
              <AddIcon className="size-8" />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
};
export default MultInputStack;
