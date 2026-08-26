import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';

import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import Minus from '@icons/minus-square-svgrepo-com.svg?react';
import Plus from '@icons/add-square-svgrepo-com.svg?react';

interface InputProps {
  cy_id: string;
  id: 'hours' | 'minutes' | 'seconds';
  defaultValue: number | undefined;
  index: number;
  register: UseFormRegister<FormValues>;
  title: string;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  watch: UseFormWatch<FormValues>;
}

const NumberInput = ({
  cy_id,
  defaultValue,
  index,
  register,
  id,
  title,
  setValue,
  getValues,
  watch,
}: InputProps) => {
  const fieldName = `setlist.${index}.transitionTime.${id}` as const;
  const value = watch(fieldName)

  return (
    <div className="flex gap-2">
      <label className="flex gap-2">
        {title}
        <input
          type="text"
          inputMode="numeric"
          data-cy={cy_id}
          className="max-w-20 rounded-md border border-dark_amethyst px-2 text-right hover:bg-bg-surface focus:bg-bg-surface"
          defaultValue={defaultValue}
          {...register(`setlist.${index}.transitionTime.${id}`, {
            valueAsNumber: true,
          })}
        />
      </label>

      <button
        type="button"
        className="max-w-8 rounded-lg bg-primary text-border-subtle hover:text-text-muted"
        onClick={() =>
          setValue(fieldName, Number(getValues(fieldName) || 0) - 1)
        }
        disabled={Number(value) < 1}
      >
        <Minus className="size-8" />
      </button>

      <button
        type="button"
        className="max-w-8 rounded-lg bg-primary text-border-subtle hover:text-text-muted"
        onClick={() =>
          setValue(fieldName, Number(getValues(fieldName) || 0) + 1)
        }
        disabled={Number(value) >= 59}
      >
        <Plus className="size-8" />
      </button>
    </div>
  );
};

export default NumberInput;
