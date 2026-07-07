import type { DurationInput } from '@/types/DurationInput';

// Converting everything to seconds and adding them recursively
export const totalSeconds = (durations: DurationInput[]): number => {
  const total: number = durations.reduce((acc, current) => {
    const h = (current.hours ?? 0) * 3600;
    const m = (current.minutes ?? 0) * 60;
    const s = current.seconds ?? 0;
    return acc + h + m + s;
  }, 0);
  return total;
};

// Use floor division to break the total seconds back down into DurationInput
export const timeBreakdown = (secondsArg: number): DurationInput => {
  const hours = Math.floor(secondsArg / 3600);
  const hoursRemainder = secondsArg % 3600;
  const minutes = Math.floor(hoursRemainder / 60);
  const minutesRemainder = hoursRemainder % 60;
  const seconds = minutesRemainder;

  return { hours, minutes, seconds };
};

export const addTimeDurations = (durations: DurationInput[]) =>
  timeBreakdown(totalSeconds(durations));
