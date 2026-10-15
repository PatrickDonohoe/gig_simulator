import { useEffect } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetFocus,
} from 'react-hook-form';

import type { SongFormValues } from '@/types/SongFormType';
import FormInputStack from '@/components/add_song/FormInputStack';

/** FormData is destructured */

export interface AddSongFormProps {
  errors: FieldErrors<SongFormValues>;
  isSubmitting: boolean;
  addSongError: string | null;
  title: string;
  submitLabel: string;
  register: UseFormRegister<SongFormValues>;
  submitAddSong: () => void;
  setFocus: UseFormSetFocus<SongFormValues>;
}

const AddSongForm = ({
  errors,
  isSubmitting,
  addSongError,
  register,
  submitAddSong,
  setFocus,
  title,
  submitLabel,
}: AddSongFormProps) => {
  useEffect(() => {
    setFocus('title');
    console.log('active after setFocus:', document.activeElement);
    requestAnimationFrame(() =>
      console.log('active next frame:', document.activeElement),
    );
  }, [setFocus]);

  return (
    <form
      id="song_form"
      data-cy="song_form"
      onSubmit={submitAddSong}
      className="flex flex-col gap-4 rounded-md border-2 border-border-subtle bg-bg-main p-3 text-text-main"
    >
      <div className="grid grid-cols-3 items-center px-4 py-2">
        <h1
          data-cy="new_song"
          className="col-start-2 text-center text-xl font-bold"
        >
          {title}
        </h1>
      </div>

      <div
        data-cy="inputs_container"
        className="flex flex-wrap justify-center gap-4"
      >
        <FormInputStack
          label="Song Title"
          inputId="title"
          register={register}
          placeholder="e.g. Freebird"
          error={errors.title}
        />

        <FormInputStack
          label="Artists"
          inputId="artists"
          register={register}
          placeholder="e.g. Lynyrd Skynyrd"
          error={errors.artists}
        />

        <FormInputStack
          label="Key"
          inputId="key"
          register={register}
          placeholder="e.g. Db"
          error={errors.key}
        />

        <FormInputStack
          label="Tempo (in beats per minute)"
          inputId="tempo"
          register={register}
          placeholder="e.g. 120"
          error={errors.tempo}
        />

        {/* Alternate Duration setup with inline minutes and seconds */}
        <section className="flex flex-col gap-2 text-base font-semibold text-text-main">
          <h2>Song Duration:</h2>

          <div className="flex flex-col gap-2 rounded-xl border border-border-bold bg-menu p-1 md:flex-row">
            <label className="flex flex-col-reverse text-sm">
              Minutes:
              <input
                id="duration-minutes"
                data-cy="duration_input"
                type="number"
                placeholder="min"
                className="active:bg-muted-teal rounded-lg bg-bg-main p-2 ring ring-border-subtle hover:bg-bg-surface focus:ring-accent"
                {...register('duration.minutes')}
              />
            </label>

            <label className="flex flex-col-reverse text-sm">
              Seconds:
              <input
                id="duration-seconds"
                data-cy="duration_input"
                type="number"
                placeholder="sec"
                className="active:bg-muted-teal rounded-lg bg-bg-main p-2 ring ring-border-subtle hover:bg-bg-surface focus:ring-accent"
                {...register('duration.seconds')}
              />
            </label>
          </div>
        </section>
      </div>

      {addSongError && (
        <span data-cy="song_error" className="text-red-500">
          {addSongError}
        </span>
      )}

      <div className="flex w-full items-center justify-end">
        <button
          data-cy="submit_button"
          type="submit"
          className="flex-none rounded-xl border border-text-main bg-menu px-2 py-1 text-text-main hover:bg-bg-surface focus-visible:ring-2 focus-visible:ring-border-bold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main focus-visible:outline-none"
          disabled={isSubmitting}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
export default AddSongForm;
