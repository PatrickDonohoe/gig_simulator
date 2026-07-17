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
}: AddSongFormProps) => {
  return (
    <form
      data-cy="song_form"
      onSubmit={submitAddSong}
      className="flex flex-col gap-4 rounded-md border-2 border-midnight_violet bg-periwinkle p-3"
    >
      <div className="flex items-center justify-center px-4 py-2">
        <h1 data-cy="new_song" className="text-xl font-bold">
          Add a new song to your library
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

        <FormInputStack
          label="Song Duration"
          inputId="duration.minutes"
          register={register}
          validationOptions={{ valueAsNumber: true }}
          error={errors.duration?.minutes}
        />

        <FormInputStack
          label="Song Duration"
          inputId="duration.seconds"
          register={register}
          validationOptions={{ valueAsNumber: true }}
          error={errors.duration?.seconds}
        />

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
          className="flex-none rounded-xl border bg-muted_teal px-2 py-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Song +'}
        </button>
      </div>
    </form>
  );
};
export default AddSongForm;
