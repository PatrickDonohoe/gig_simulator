import { Link } from 'react-router';

import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
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
  const formattedTime = timeBreakdown(song.duration);

  return (
    <li
      id={`tile-${song.id}`}
      className="flex max-w-160 flex-col gap-4 rounded-md border-2 border-border-bold bg-bg-main px-4 py-2 text-text-main divide-y-2 divide-text-main"
    >

        <div className="flex justify-between items-center pb-4">
          <div
            id="title-container"
            className="flex items-center gap-2 p-1 text-center text-lg"
          >
            <Title className="size-8" />{' '}
            <span id="song-title" className="text-text-main">
              {song.title}
            </span>
          </div>
          {/* This button will open the (edit) song form. */}
          <Link
            to={`edit-song/${song.id}`}
            id={`edit-${song.id}`}
            className="col-start-3 justify-self-end hover:text-accent"
          >
            <Pencil className="size-8" />
          </Link>
        </div>

        <div id="attributes-container" className="flex flex-col md:flex-row gap-2">
          {/* TODO: return to change svg */}
          <SongAttribute
            icon={<Artist className="size-8" />}
            attributeId="artists"
            attributeText={song.artists}
          />
          <SongAttribute
            icon={<KeySig className="size-8" />}
            attributeId="key"
            attributeText={`key of: ${song.key} ${song.mode}`}
          />
          <SongAttribute
            icon={<Metronome className="size-8" />}
            attributeId="tempo"
            attributeText={`${song.tempo} bpm`}
          />
          <SongAttribute
            icon={<Clock className="size-8" />}
            attributeId="duration"
            attributeText={`${formattedTime.minutes}:${formatDuration(formattedTime.seconds)}`}
          />
        </div>
    </li>
  );
};
export default SongTile;
