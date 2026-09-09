import type { SongFormValues } from '@/types/SongFormType';
import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';

export const emptySongFormValues = (): SongFormValues => ({
  title: '',
  artist: '',
  genre: '',
  key: '',
  tempo: '',
  duration: { hours: '0', minutes: '0', seconds: '0' },
  instrumentation: [{ value: '' }],
});

export const songToFormValues = (song: SongType): SongFormValues => {
  const timeToNumbers = timeBreakdown(song.duration);

  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    genre: song.genre,
    key: song.key,
    tempo: song.tempo,
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
