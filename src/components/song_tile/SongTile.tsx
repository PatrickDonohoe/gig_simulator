import { useState } from 'react';
import { Link } from 'react-router';

import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
import GrabArea from '@icons/grab-horizontal-svgrepo-com.svg?react';
import Artist from '@icons/person-svgrepo-com.svg?react';
import Title from '@icons/music-note-song-title.svg?react';
import KeySig from '@icons/B-flat-major_g-minor.svg?react';
import Metronome from '@icons/metronome-svgrepo-com.svg?react';
import SongAttribute from '@/components/search_results/SongAttribute';
import Clock from '@icons/time-svgrepo-com.svg?react';
import type { SongType } from '@/types/SongType';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

/**
 * @param song Data for the mapped song.
 * @returns A reusable song tile that expands, collapses, and allows for edits.
 */

export interface SongTileProps {
  song: SongType;
}

const SongTile = ({ song }: SongTileProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formattedTime = timeBreakdown(song.duration);

  return (
    <li
      id={`tile-${song.id}`}
      className="flex max-w-80 flex-col gap-4 rounded-md border-2 border-border-bold bg-bg-main px-4 py-2 text-text-main"
    >
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-2 flex items-center justify-self-start gap-2 p-1 text-center text-lg">
          <Title className="size-8" />{' '}
          <span id='song-title' className="text-text-main">{song.title}</span>
        </div>

        {/* This button will open the (edit) song form. */}
        <Link
          to={`edit-song/${song.id}`}
          id={`edit-${song.id}`}
          className={`col-start-3 hover:text-accent justify-self-end ${isExpanded ? 'visible' : 'hidden'}`}
        >
          <Pencil className="size-8" />
        </Link>

        <div
          className={`flex wrap ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* TODO: return to change svg */}
          <SongAttribute
            icon={<Artist className="size-8" />}
            attributeId='artists'
            attributeText={song.artists}
          />
          <SongAttribute
            icon={<KeySig className="size-8" />}
            attributeId='key'
            attributeText={`key of: ${song.key} ${song.mode}`}
          />
          <SongAttribute
            icon={<Metronome className="size-8" />}
            attributeId='tempo'
            attributeText={`${song.tempo} bpm`}
          />
          <SongAttribute
            icon={<Clock className="size-8" />}
            attributeId='duration'
            attributeText={`${formattedTime.minutes}:${formatDuration(formattedTime.seconds)}`}
          />
        </div>
      </div>

      {/* Add shading and textured bumps */}
      <button
        id={`expand-${song.id}`}
        type="button"
        className="flex gap-1 px-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GrabArea className="size-8" />
        <GrabArea className="size-8" />
      </button>
    </li>
  );
};
export default SongTile;
