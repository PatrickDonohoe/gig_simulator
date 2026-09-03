import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import NumberInput from '@/components/NumberInput';
import type { FormValues } from '@/hooks/use_setlist/useSetlist';

const Harness = () => {
  const { register, setValue, getValues, control } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      setlistName: '',
      setlist: [
        {
          kind: 'transition',
          transitionId: 't1',
          notes: '',
          transitionTime: { hours: 0, minutes: 0, seconds: 0 },
        },
      ],
    },
  });

  return (
    <NumberInput
      title="Enter Minutes"
      cy_id="minutes-tran-0"
      id="minutes"
      defaultValue={0}
      index={0}
      register={register}
      getValues={getValues}
      setValue={setValue}
      control={control}
    />
  );
};

describe('NumberInput', () => {
  // Regression: `form.watch()` used to drive the disabled states, but React
  // Compiler memoises the call away so the minus button never re-enabled after
  // an increment. `useWatch` keeps it reactive.
  it('enables the minus button once the value goes above zero', () => {
    render(<Harness />);

    const [minusBtn, plusBtn] = screen.getAllByRole('button') as [
      HTMLButtonElement,
      HTMLButtonElement,
    ];
    const field = screen.getByLabelText('Enter Minutes') as HTMLInputElement;

    expect(minusBtn.disabled).toBe(true);

    fireEvent.click(plusBtn);

    expect(field.value).toBe('1');
    expect(minusBtn.disabled).toBe(false);

    fireEvent.click(minusBtn);

    expect(field.value).toBe('0');
    expect(minusBtn.disabled).toBe(true);
  });
});
