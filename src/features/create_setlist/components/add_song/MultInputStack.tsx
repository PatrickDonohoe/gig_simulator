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
      className="flex flex-col gap-2 text-lg font-semibold"
    >
      {label}:
      <div className="grid grid-cols-[1fr_3rem] gap-2 border border-midnight_violet p-2 rounded-xl">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="col-span-full grid grid-flow-col grid-cols-subgrid"
          >
            <input
              data-cy="input"
              type="text"
              className="bg-golden_apricot rounded-lg p-2 ring ring-midnight_violet hover:bg-periwinkle focus:bg-muted_teal"
              {...register(`instrumentation.${index}.value`)}
            />
            <button
              data-cy="rmv_button"
              type='button'
              className="flex-none place-self-center ring-muted_teal hover:ring"
              onClick={() => onRemove(index)}
            >
              <MinusIcon className="size-8" />
            </button>
          </div>
        ))}
        <div
          data-cy="add_btn_container"
          className="col-span-full col-start-2 grid grid-cols-subgrid place-self-center py-2"
        >
          <button
            data-cy="add_button"
            type='button'
            onClick={onAdd}
            className="flex-none place-self-center ring-muted_teal hover:ring"
          >
            <AddIcon className="size-8" />
          </button>
        </div>
      </div>
    </label>
  );
};
export default MultInputStack;
