import type { DurationInput } from '@/types/DurationInput';
import type { SongFormValues } from '@/types/SongFormType';

// Convert single time object to seconds.
export const durationToSeconds = (duration: DurationInput): number => {
  const h = (duration.hours ?? 0) * 3600;
  const m = (duration.minutes ?? 0) * 60;
  const s = Number(duration.seconds ?? 0);

  return h + m + s;
};

// Converting everything to seconds and adding them recursively
export const totalSeconds = (durations: DurationInput[]): number => {
  const total: number = durations.reduce((acc, current) => {
    const seconds = durationToSeconds(current);
    return acc + seconds;
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

// Take array of time objects, add them together, and return as a single time object.
export const addTimeDurations = (durations: DurationInput[]): DurationInput =>
  timeBreakdown(totalSeconds(durations));

// Format duration of hours, minutes, or seconds to be two digits
export const formatDuration = (time: number | undefined): string =>
  String(time ?? 0).padStart(2, '0') ?? '00';

// Convert duration (in ms) from Recco Beats to display format
export const msToDisplay = (ms: number): SongFormValues['duration'] => {
  const timeInSeconds: number = Math.round(ms / 1000);
  const breakdown = timeBreakdown(timeInSeconds);
  return {
    hours: String(breakdown.hours),
    minutes: String(breakdown.minutes),
    seconds: String(breakdown.seconds),
  };
};

export const secToDisplay = (seconds: number): string => {
  const breakdown = timeBreakdown(seconds);
  return `${formatDuration(breakdown.minutes)}:${formatDuration(breakdown.seconds)}`;
};
