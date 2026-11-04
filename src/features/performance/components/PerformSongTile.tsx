import { useEffect, useRef } from 'react';

import type { SongStatus } from '@/features/performance/utils/songPosition';
import type { SongType } from '@/types/SongType';
import { secToDisplay } from '@/utils/add_time/addTimeDurations';

interface PerformSongTileProps {
  song: SongType | undefined; // undefined when the song left the library
  position: number;
  status: SongStatus;
  onSelect: (position: number) => void;
}

interface StatProps {
  label: string;
  value: string | number;
}

// A large, glanceable value with a small label above it.
const Stat = ({ label, value }: StatProps) => (
  <div className="flex min-w-16 flex-col items-center rounded-lg bg-bg-main px-3 py-1">
    <dt className="text-xs tracking-wide text-text-muted uppercase">{label}</dt>
    <dd className="text-xl font-semibold tabular-nums">{value}</dd>
  </div>
);

// Adds the minor "m" if the mode is minor.
const formatKey = (song: SongType) =>
  song.mode === 'minor' ? `${song.key}m` : song.key;

// Handles styling the song's visible display status at a glance.
const statusClasses: Record<SongStatus, string> = {
  past: 'opacity-50',
  current: 'ring-2 ring-primary',
  upcoming: '',
};

/**
 * This song tile is part of the performance setlist view and displays song
 * details, as available, to the user. Styling is based on the value of status.
 *
 * @param song The song's display data or undefined if the song is not found.
 * @param position The value of index + 1 of an array of only songs.
 * @param status A value used to determine styling of past, current, and future
 *   songs.
 * @param onSelect A function to select this tile as the current song, which
 *   will change the value of status.
 * @returns A list item tile that functions as a button.
 */

const PerformSongTile = ({
  song,
  position,
  status,
  onSelect,
}: PerformSongTileProps) => {
  const ref = useRef<HTMLLIElement>(null);

  // Keep the current song in view, including on load after a refresh.
  useEffect(() => {
    if (status !== 'current') return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    ref.current?.scrollIntoView({
      block: 'center',
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [status]);

  return (
    <li
      ref={ref}
      data-cy={`perform-song-${position}`}
      aria-current={status === 'current' ? 'step' : undefined}
      className={`rounded-xl border bg-bg-surface transition ${song ? 'border-border-subtle' : 'border-dashed border-border-subtle'} ${statusClasses[status]}`}
    >
      {/* tapping a song makes it the current song */}
      <button
        type="button"
        onClick={() => onSelect(position)}
        className="flex w-full flex-col gap-3 p-4 text-left sm:flex-row sm:items-center sm:gap-4"
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <span className="w-10 flex-none text-3xl font-bold text-text-muted tabular-nums">
            {position}
          </span>
          {song ? (
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-bold sm:text-3xl">
                {song.title}
              </h3>
              <p className="truncate text-text-muted">{song.artists}</p>
            </div>
          ) : (
            <p className="text-text-muted">Data unavailable</p>
          )}
        </div>

        {song && (
          <dl className="flex flex-none gap-2">
            <Stat label="Key" value={formatKey(song)} />
            <Stat label="BPM" value={song.tempo} />
            <Stat label="Time" value={secToDisplay(song.duration)} />
          </dl>
        )}
      </button>
    </li>
  );
};
export default PerformSongTile;
