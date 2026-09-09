import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { saveSong } from '@/utils/songStorage';
import type { SongType } from '@/types/SongType';
import { totalSeconds } from '@/utils/add_time/addTimeDurations';
import type { AddSongFormProps } from '../components/add_song/AddSongForm';
import { SongFormSchema, type SongFormValues } from '@/types/SongFormType';
import {
  emptySongFormValues,
  songToFormValues,
} from '@/utils/build_form_values/buildSongFormValues';
import type { DurationInput } from '@/types/DurationInput';

export type AddSongFormValues = SongFormValues;

const useSongForm = (
  onSave: (newSong: SongType) => void,
) => {
  const [target, setTarget] = useState<SongType | 'new' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isOpen = target !== null;
  const editingSong = target === 'new' ? null : target;
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

  // prefills the correct default values based on use case of the form
  useEffect(() => {
    if (target === null) return;
    reset(target === 'new' ? emptySongFormValues() : songToFormValues(target));
  }, [target, reset]);

  const addSong = (data: SongFormValues) => {
    // Convert from strings to numbers
    const durationInput: DurationInput = {
      hours: Number(data.duration.hours) || 0,
      minutes: Number(data.duration.minutes) || 0,
      seconds: Number(data.duration.seconds) || 0,
    };

    const song: SongType = {
      ...data,
      instrumentation: data.instrumentation.map((i) => i.value).filter(Boolean),
      duration: totalSeconds([durationInput]),
      id: data.id ?? crypto.randomUUID(),
    };

    try {
      saveSong(song); // saves song to storage
      onSave(song); // adds song to the sidebar library
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

  return {
    formData,
    openAddSong,
    openEditSong,
    closeSongForm,
    isSongFormOpen: isOpen,
  };
};

export default useSongForm;
