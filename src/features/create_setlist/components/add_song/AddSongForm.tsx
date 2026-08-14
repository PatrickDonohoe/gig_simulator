import FormInputStack from '@/features/create_setlist/components/add_song/FormInputStack';
import MultInputStack from './MultInputStack';
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import type { AddSongFormValues } from '../../hooks/useAddSong';

export interface AddSongFormProps {
  register: UseFormRegister<AddSongFormValues>;
  errors: FieldErrors<AddSongFormValues>;
  isSubmitting: boolean;
  instrumentationFields: FieldArrayWithId<
    AddSongFormValues,
    'instrumentation'
  >[];
  appendInstrumentation: () => void;
  removeInstrumentation: (index: number) => void;
  submitAddSong: () => void;
  addSongError: string | null;
  handleIsAddSong: (bool: boolean) => void;
}

const AddSongForm = ({
  register,
  errors,
  isSubmitting,
  submitAddSong,
  instrumentationFields,
  appendInstrumentation,
  removeInstrumentation,
  addSongError,
  handleIsAddSong,
}: AddSongFormProps) => {
  return (
    <form
      data-cy="song_form"
      onSubmit={submitAddSong}
      className="flex flex-col gap-4 rounded-md border-2 border-border-subtle bg-bg-main p-3"
    >
      <div className="grid grid-cols-3 items-center px-4 py-2">
        <h1
          data-cy="new_song"
          className="col-start-2 text-center text-xl font-bold text-text-main"
        >
          Add a new song to your library
        </h1>

        <button
          data-cy="close"
          type="button"
          className="col-start-3 justify-self-end rounded-xl border-2 border-border-bold bg-bg-main px-4 py-2 font-bold text-text-main hover:bg-primary-hover hover:text-accent"
          onClick={() => handleIsAddSong(false)}
        >
          X
        </button>
      </div>

      <div
        data-cy="inputs_container"
        className="flex flex-wrap justify-center gap-4"
      >
        <FormInputStack
          label="Song Title"
          inputId="title"
          register={register}
          validationOptions={{ required: 'Song title is required.' }}
          placeholder="e.g. Freebird"
          error={errors.title}
        />

        <FormInputStack
          label="Artist"
          inputId="artist"
          register={register}
          validationOptions={{ required: 'Artist name is required.' }}
          placeholder="e.g. Lynyrd Skynyrd"
          error={errors.artist}
        />

        <FormInputStack
          label="Genre"
          inputId="genre"
          register={register}
          placeholder="e.g. Rock N Roll"
          error={errors.genre}
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
        <section className="flex flex-col gap-2 text-lg font-semibold text-text-main">
          <h2>Song Duration:</h2>

          <div className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-baby_blue_ice p-1 md:flex-row">
            <label className="flex flex-col text-sm">
              Minutes:
              <input
                data-cy="duration_input"
                type="number"
                placeholder="min"
                className="active:bg-muted-teal rounded-lg p-2 ring ring-border-subtle hover:bg-periwinkle"
                {...register('duration.minutes')}
              />
            </label>

            <label className="flex flex-col text-sm">
              Seconds:
              <input
                data-cy="duration_input"
                type="number"
                placeholder="sec"
                className="active:bg-muted-teal rounded-lg p-2 ring ring-border-subtle hover:bg-periwinkle"
                {...register('duration.seconds')}
              />
            </label>
          </div>
        </section>

        <MultInputStack
          label="Instrumentation"
          fields={instrumentationFields}
          register={register}
          onAdd={appendInstrumentation}
          onRemove={removeInstrumentation}
        />
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
          className="flex-none rounded-xl border bg-accent px-2 py-1 text-text-main hover:bg-bg-surface"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Song +'}
        </button>
      </div>
    </form>
  );
};
export default AddSongForm;
