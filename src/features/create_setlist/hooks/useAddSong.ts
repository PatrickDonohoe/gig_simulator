import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

import { saveSong } from '@/utils/songStorage';
import type { SongType } from '@/types/SongType';
import type { SetlistTileType } from '@/types/SetlistTileType';
import type { DurationInput } from '@/types/DurationInput';
import { totalSeconds } from '@/utils/addTimeDurations';
import type { AddSongFormProps } from '../components/add_song/AddSongForm';

export type SubmitSong = Omit<SongType, 'id'>;

export interface AddSongFormValues extends Omit<
  SubmitSong,
  'instrumentation' | 'duration'
> {
  instrumentation: { value: string }[];
  duration: DurationInput;
}

const useAddSong = (onSave: (newSong: SetlistTileType) => void) => {
  const [isAddSong, setIsAddSong] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddSongFormValues>({
    defaultValues: {
      title: '',
      artist: '',
      genre: '',
      key: '',
      tempo: '',
      duration: { hours: 0, minutes: 0, seconds: 0 },
      instrumentation: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instrumentation',
  });

  const handleIsAddSong = (bool: boolean) => setIsAddSong(bool);

  const addSong = (data: AddSongFormValues) => {
    const songId: string = crypto.randomUUID();
    const extendedData: SetlistTileType = {
      ...data,
      instrumentation: data.instrumentation.map((i) => i.value).filter(Boolean),
      duration: totalSeconds([data.duration]),
      id: songId,
      transitionTime: { hours: 0, minutes: 0, seconds: 0 },
      notes: '',
    };

    try {
      saveSong(extendedData);
      onSave(extendedData);
    } catch (dbError) {
      setError(dbError instanceof Error ? dbError.message : null);
    }
  };

  const formData: AddSongFormProps = {
    register,
    isSubmitting,
    instrumentationFields: fields,
    appendInstrumentation: () => append({ value: '' }),
    removeInstrumentation: remove,
    submitAddSong: handleSubmit(addSong),
    errors,
    addSongError: error,
  };

  return {
    formData,
    handleIsAddSong,
    isAddSong,
  };
};

export default useAddSong;
