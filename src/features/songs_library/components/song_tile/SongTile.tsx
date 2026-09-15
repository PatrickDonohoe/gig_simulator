import { useState } from 'react';

import Pencil from '@icons/edit-3-svgrepo-com.svg?react';
import GrabArea from '@icons/grab-horizontal-svgrepo-com.svg?react';

/**
 * @param index Place in the array of songs.
 * @returns A reusable song tile that expands, collapses, and allows for edits.
 */

export interface SongTileProps {
  // index: number;
  id: string;
  title: string;
}

const SongTile = ({ id, title }: SongTileProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <li
      id={`tile-${id}`}
      className="flex flex-col gap-4 bg-bg-main px-4 py-2 text-text-main"
    >
      <div className="grid grid-cols-3">
        <span className="col-start-2 text-center text-lg">{title}</span>
        
        {isExpanded && (
          <button id={`edit-${id}`} type="button" className="hover:text-accent">
            <Pencil className="size-8" />
          </button>
        )}
      </div>

      {/* Add shading and textured bumps */}
      <button
        id={`expand-${id}`}
        type="button"
        className="flex gap-2 p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <GrabArea className='size-8' /> <GrabArea className='size-8' />
      </button>
    </li>
  );
};
export default SongTile;
