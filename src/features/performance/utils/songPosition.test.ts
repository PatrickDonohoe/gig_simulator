import { describe, it, expect } from 'vitest';

import {
  clampPosition,
  parsePosition,
  songStatus,
} from '@/features/performance/utils/songPosition';

describe('parsePosition reads the song position from the URL param', () => {
  it('starts at song 1 when the param is missing', () => {
    expect(parsePosition(null, 5)).toEqual(1);
  });

  it('starts at song 1 for invalid values', () => {
    expect(parsePosition('abc', 5)).toEqual(1);
    expect(parsePosition('0', 5)).toEqual(1);
    expect(parsePosition('-2', 5)).toEqual(1);
    expect(parsePosition('2.5', 5)).toEqual(1);
  });

  it('returns a valid position unchanged', () => {
    expect(parsePosition('3', 5)).toEqual(3);
  });

  it('caps the position at the complete state (songCount + 1)', () => {
    expect(parsePosition('6', 5)).toEqual(6);
    expect(parsePosition('40', 5)).toEqual(6);
  });
});

describe('clampPosition keeps a position between song 1 and complete', () => {
  it('does not go below song 1', () => {
    expect(clampPosition(0, 5)).toEqual(1);
  });

  it('does not go past the complete state', () => {
    expect(clampPosition(7, 5)).toEqual(6);
  });

  it('returns positions in range unchanged', () => {
    expect(clampPosition(4, 5)).toEqual(4);
  });
});

describe('songStatus compares a song position to the current position', () => {
  it('marks earlier songs as past', () => {
    expect(songStatus(1, 3)).toEqual('past');
  });

  it('marks the current song', () => {
    expect(songStatus(3, 3)).toEqual('current');
  });

  it('marks later songs as upcoming', () => {
    expect(songStatus(4, 3)).toEqual('upcoming');
  });
});
