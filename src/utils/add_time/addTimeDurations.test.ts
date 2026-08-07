import { describe, it, expect } from 'vitest';

import {
  addTimeDurations,
  durationToSeconds,
  totalSeconds,
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

describe('durationToSeconds converts data of type DurationInput to number of total seconds', () => {
  it('returns 0 when hours, minutes, and seconds all equal 0', () => {
    const total: number = durationToSeconds({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    expect(total).toEqual(0);
  });

  it('should return the correct total with only partial data', () => {
    const total: number = durationToSeconds({ minutes: 5, seconds: 30 });

    expect(total).toEqual(330);
  });

  it('should return the correct total with all data present', () => {
    const total: number = durationToSeconds({
      hours: 2,
      minutes: 3,
      seconds: 15,
    });

    expect(total).toEqual(7395);
  });

  it('should return 0 if object is empty', () => {
    const total: number = durationToSeconds({});

    expect(total).toEqual(0);
  });
});

describe('formatDuration should return a two-digit string of numbers', () => {
  it('should return 00 if argument is undefined', () => {
    const result: string = formatDuration(undefined);

    expect(result).toBe('00');
  });

  it('should return 00 if 0 is entered', () => {
    const result: string = formatDuration(0);

    expect(result).toEqual('00');
  });

  it('should return a two-digit number if a single-digit is supplied', () => {
    const result: string = formatDuration(5);

    expect(result).toEqual('05');
  });

  it('should return the same two-digit number if a two-digit is supplied', () => {
    const result: string = formatDuration(22);

    expect(result).toEqual('22');
  });
});

describe('totalSeconds converts an array of duration objects into a total number of seconds', () => {
  it('returns 0 if an empty array is supplied', () => {
    const result = totalSeconds([]);

    expect(result).toEqual(0);
  });

  it('returns the correct amount if there is only one item in the array', () => {
    const result = totalSeconds([{ hours: 1, minutes: 1, seconds: 1 }]);

    expect(result).toEqual(3661);
  });

  it('returns the correct amount if there are multiple items in the array', () => {
    const result = totalSeconds([
      { hours: 2, minutes: 3, seconds: 4 },
      { minutes: 4, seconds: 5 },
    ]);

    expect(result).toEqual(7629);
  });
});

describe('timeBreakdown will convert total number of seconds into a duration object', () => {
  it('will return 0 for hours, minutes, and seconds if the argument is 0', () => {
    const duration = timeBreakdown(0);

    expect(duration).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it('will return the correct value if less than 60 seconds are supplied', () => {
    const duration = timeBreakdown(24);

    expect(duration).toEqual({ hours: 0, minutes: 0, seconds: 24 });
  });

  it('will return the correct value if more than 60 but less than 3600 are supplied', () => {
    const duration = timeBreakdown(125);

    expect(duration).toEqual({ hours: 0, minutes: 2, seconds: 5 });
  });

  it('will return the correct value if more than 3600 is supplied', () => {
    const duration = timeBreakdown(4515);

    expect(duration).toEqual({ hours: 1, minutes: 15, seconds: 15 });
  });
});

describe('addTimeDurations will convert array of time objects into total seconds and then back into a single time object', () => {
  it('will return an "empty" time object if supplied an empty array', () => {
    const array = addTimeDurations([]);

    expect(array).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it('will return the correct value if only one item is in the array', () => {
    const array = addTimeDurations([{ hours: 0, minutes: 2, seconds: 5 }]);

    expect(array).toEqual({ hours: 0, minutes: 2, seconds: 5 });
  });

  it('will return the correct value if more than one item is in the array', () => {
    const array = addTimeDurations([
      { hours: 2, minutes: 3, seconds: 4 },
      { minutes: 54, seconds: 5 },
      { hours: 0, minutes: 2, seconds: 5 },
      { hours: 1, minutes: 15, seconds: 15 },
    ]);

    expect(array).toEqual({ hours: 4, minutes: 14, seconds: 29 });
  });
});
