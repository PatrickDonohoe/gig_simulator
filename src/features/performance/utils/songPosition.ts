export type SongStatus = 'past' | 'current' | 'upcoming';

// Reads the 1-based song position from the URL's `song` param. Anything
// missing or invalid starts the set at song 1. One past the last song
// (songCount + 1) means the set is complete, so values are capped there.
export const parsePosition = (
  raw: string | null,
  songCount: number,
): number => {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 ? Math.min(n, songCount + 1) : 1;
};

// If there is a valid position, and the set is not yet complete, return the position. Else, return the "isComplete" value of songCount + 1
export const clampPosition = (position: number, songCount: number): number =>
  Math.min(Math.max(position, 1), songCount + 1);

export const songStatus = (position: number, current: number): SongStatus =>
  position < current ? 'past' : position === current ? 'current' : 'upcoming';
