import type {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  FieldValues,
  FieldPath,
} from 'react-hook-form';

export interface InputStackProps<TFieldValues extends FieldValues> {
  label: string;
  inputId: FieldPath<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  validationOptions?: RegisterOptions<TFieldValues>;
  placeholder?: string;
  className?: string;
  error?: FieldError;
}

const FormInputStack = <TFieldValues extends FieldValues>({
  label,
  inputId,
  register,
  validationOptions,
  placeholder,
  className,
  error,
}: InputStackProps<TFieldValues>) => {
  return (
    <label
      data-cy="input_label"
      className="flex flex-col gap-2 text-lg font-semibold"
    >
      {label}:
      <input
        data-cy={`input-${inputId}`}
        type="text"
        placeholder={placeholder}
        className={`${className} rounded-lg bg-bg-main p-2 ring ring-border-bold text-text-main hover:bg-golden_apricot hover:text-midnight_violet active:bg-bg-surface focus:ring-accent`}
        {...register(inputId, validationOptions)}
      />
      {error && (
        <span data-cy="input_error" className="text-base text-red-500">
          {error.message}
        </span>
      )}
    </label>
  );
};
export default FormInputStack;
