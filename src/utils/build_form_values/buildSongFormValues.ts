import type { SongFormValues } from '@/types/SongFormType';
import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';

export const emptySongFormValues = (): SongFormValues => ({
  title: '',
  artists: '',
  key: '',
  mode: 'not found',
  tempo: '',
  duration: { hours: '0', minutes: '0', seconds: '0' },
  instrumentation: [{ value: '' }],
});

export const songToFormValues = (song: SongType): SongFormValues => {
  const timeToNumbers = timeBreakdown(song.duration);

  return {
    id: song.id,
    title: song.title,
    artists: song.artists,
    key: song.key,
    mode: song.mode,
    tempo: String(song.tempo),
    duration: {
      hours: String(timeToNumbers.hours),
      minutes: String(timeToNumbers.minutes),
      seconds: String(timeToNumbers.seconds),
    },
    instrumentation:
      song.instrumentation.length > 0
        ? song.instrumentation.map((value) => ({ value }))
        : [{ value: '' }],
  };
};
