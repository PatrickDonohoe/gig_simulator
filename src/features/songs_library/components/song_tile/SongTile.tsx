import { useState } from 'react';

import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
import GrabArea from '@icons/grab-horizontal-svgrepo-com.svg?react';
import Artist from '@icons/person-svgrepo-com.svg?react';
import Title from '@icons/music-note-song-title.svg?react';
import Genre from '@icons/album-collection-svgrepo-com.svg?react';
import type { SongType } from '@/types/SongType';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

/**
 * @param id The song's id
 * @param title The song's title
 * @param getSongDisplayDetails Retrieves this song's data once displayed
 * @returns A reusable song tile that expands, collapses, and allows for edits.
 */

export interface SongTileProps {
  openEdit: () => void; // id to be supplied as argument by the calling component.
  song: SongType;
}

const SongTile = ({ song, openEdit }: SongTileProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formattedTime = timeBreakdown(song.duration);

  return (
    <li
      id={`tile-${song.id}`}
      className="flex max-w-80 flex-col gap-4 rounded-md border-2 border-border-bold bg-bg-main px-4 py-2 text-text-main"
    >
      <div className="grid grid-cols-3">
        <div className="col-start-2 flex items-center justify-center gap-2 p-1 text-center text-lg">
          <Title className="size-8" />{' '}
          <span className="text-text-main">{song.title}</span>
        </div>

        {/* This button will open the (edit) song form. */}
        <button
          id={`edit-${song.id}`}
          type="button"
          className={`hover:text-accent ${isExpanded ? 'visible' : 'hidden'}`}
          onClick={openEdit}
        >
          <Pencil className="size-8" />
        </button>

        <div
          className={`grid grid-cols-subgrid ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex items-center justify-center p-1">
            <Artist className="size-8" />{' '}
            <span className="text-text-main">{song.artist}</span>
          </div>
          <div className="flex items-center justify-center p-1">
            <Genre className="size-8" />{' '}
            <span className="text-text-main">{song.genre}</span>
          </div>
          <div className="flex items-center justify-center p-1">
            <Artist className="size-8" />{' '}
            <span className="text-text-main">key of: {song.key}</span>
          </div>
          <div className="flex items-center justify-center p-1">
            <Artist className="size-8" />{' '}
            <span className="text-text-main">{song.tempo} bpm</span>
          </div>
          <div className="flex items-center justify-center p-1">
            <Artist className="size-8" />{' '}
            <span className="text-text-main">
              {formattedTime.minutes}:{formatDuration(formattedTime.seconds)}
            </span>
          </div>
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
