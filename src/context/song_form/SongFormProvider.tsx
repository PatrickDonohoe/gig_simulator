import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  SongFormContext,
  type SongFormContextType,
} from '@/context/song_form/SongFormContext';
import { useLibraryStore } from '@/stores/useLibraryStore';
import type { SongType } from '@/types/SongType';
import { SongFormSchema, type SongFormValues } from '@/types/SongFormType';
import {
  emptySongFormValues,
  songToFormValues,
} from '@/utils/build_form_values/buildSongFormValues';
import type { DurationInput } from '@/types/DurationInput';
import { totalSeconds } from '@/utils/add_time/addTimeDurations';
import type { AddSongFormProps } from '@/components/add_song/AddSongForm';

const SongFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [target, setTarget] = useState<SongType | 'new' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = useLibraryStore((state) => state.updateSong);
  const create = useLibraryStore((state) => state.addSong);

  const isOpen = target !== null;
  // If the song form is not open or it is a "new song" form, return null.
  // Otherwise, return the target. If the target is null, it will return null.
  // If the target is of type SongType, it will return as a not null value.
  const editingSong = !isOpen || target === 'new' ? null : target;

  // These three functions set the value of target when implemented.
  const openAddSong = () => setTarget('new');
  const openEditSong = (song: SongType) => setTarget(song);
  const closeSongForm = () => setTarget(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SongFormValues>({
    resolver: zodResolver(SongFormSchema),
    mode: 'onChange',
  });

  // Used to handle the array of instruments in the form.
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instrumentation',
  });

  // Prefills the correct default values based on use case of the form.
  // If target is changed or the form is reset, the form is passed the new values.
  useEffect(() => {
    if (target === null) return;
    reset(target === 'new' ? emptySongFormValues() : songToFormValues(target));
  }, [target, reset]);

  // During onSubmit, if the song is being edited, update the song in the library.
  // If not, add the song to the library.
  const handleSongSaved = (song: SongType) =>
    editingSong ? update(song) : create(song);

  // RHF submit function for both add and edit song
  const addSong = (data: SongFormValues) => {
    if (target === null) return;
    // Convert from strings to numbers
    const durationInput: DurationInput = {
      hours: Number(data.duration.hours) || 0,
      minutes: Number(data.duration.minutes) || 0,
      seconds: Number(data.duration.seconds) || 0,
    };

    const song: SongType = {
      ...data,
      tempo: Number(data.tempo) || 0,
      instrumentation: data.instrumentation.map((i) => i.value).filter(Boolean),
      duration: totalSeconds([durationInput]),
      id: data.id ?? crypto.randomUUID(),
    };

    try {
      handleSongSaved(song);
      closeSongForm();
      reset(emptySongFormValues()); // resets the form
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : null);
    }
  };

  const formData: AddSongFormProps = {
    isSubmitting,
    instrumentationFields: fields,
    errors,
    addSongError: error,
    title: editingSong ? 'Edit song' : 'Add a new song to your library',
    submitLabel: editingSong ? 'Save changes' : 'Add Song +',
    onClose: closeSongForm,
    register,
    appendInstrumentation: () => append({ value: '' }),
    removeInstrumentation: remove,
    submitAddSong: handleSubmit(addSong),
    setFocus,
  };

  const value: SongFormContextType = {
    target,
    formData,
    openAddSong,
    openEditSong,
    closeSongForm,
    isSongFormOpen: isOpen,
    handleSongSaved,
  };

  return (
    <SongFormContext.Provider value={value}>
      {children}
    </SongFormContext.Provider>
  );
};
export default SongFormProvider;
