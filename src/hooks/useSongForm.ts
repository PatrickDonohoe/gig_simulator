import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SongFormSchema, type SongFormValues } from '@/types/SongFormType';
import type { SongType } from '@/types/SongType';
import type { DurationInput } from '@/types/DurationInput';
import type { AddSongFormProps } from '@/components/add_song/AddSongForm';
import { totalSeconds } from '@/utils/add_time/addTimeDurations';

const useSongForm = (
  defaultValues: SongFormValues,
  onSave: (song: SongType) => void,
) => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SongFormValues>({
    defaultValues,
    resolver: zodResolver(SongFormSchema),
    mode: 'onChange',
  });

  // RHF submit function for both add and edit song. Also saves to storage.
  const addSong = (data: SongFormValues) => {

    // Convert from strings to numbers
    const durationInput: DurationInput = {
      hours: Number(data.duration.hours) || 0,
      minutes: Number(data.duration.minutes) || 0,
      seconds: Number(data.duration.seconds) || 0,
    };

    const song: SongType = {
      ...data,
      tempo: Number(data.tempo) || 0,
      duration: totalSeconds([durationInput]),
      id: data.id ?? crypto.randomUUID(),
    };

    try {
      onSave(song);
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : null);
    }
  };

  const formData: Omit<AddSongFormProps, 'title' | 'submitLabel'> = {
    isSubmitting,
    errors,
    addSongError: error,
    register,
    submitAddSong: handleSubmit(addSong),
    setFocus,
  };

  return formData;
};
export default useSongForm;
