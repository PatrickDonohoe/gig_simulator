import type { DurationInput } from '@/types/DurationInput';

export const addTimeDurations = (durations: DurationInput[]): DurationInput => {
  // Converting everything to seconds and adding them recursively
  const totalSeconds: number = durations.reduce((acc, current) => {
    const h = (current.hours ?? 0) * 3600;
    const m = (current.minutes ?? 0) * 60;
    const s = current.seconds ?? 0;
    return acc + h + m + s;
  }, 0);

  // Use floor division to break the total seconds back down into DurationInput
  const hours = Math.floor(totalSeconds / 3600);
  const hoursRemainder = totalSeconds % 3600;
  const minutes = Math.floor(hoursRemainder / 60);
  const minutesRemainder = hoursRemainder % 60;
  const seconds = minutesRemainder;

  return { hours, minutes, seconds };
};
