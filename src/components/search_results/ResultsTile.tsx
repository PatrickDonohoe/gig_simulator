import { Link } from 'react-router';

import Time from '@icons/time-svgrepo-com.svg?react';
import Artist from '@icons/person-svgrepo-com.svg?react';
import Title from '@icons/music-note-song-title.svg?react';
import type { SearchResultRow } from '@/types/SearchResultsProps';
import { secToDisplay } from '@/utils/add_time/addTimeDurations';
import SongAttribute from '@/components/search_results/SongAttribute';

interface ResultsTileProps {
  song: SearchResultRow;
}



const ResultsTile = ({ song }: ResultsTileProps) => {

  const formattedTime = secToDisplay(song.durationSec);
  const formattedArtists =
    song.artists.length > 0
      ? song.artists.map((a) => a.name).join(', ')
      : 'Unavailable';

  return (
    <li
      id={`results-tile-${song.id}`}
      className="flex max-w-80 flex-col gap-4 rounded-md border-2 border-border-bold bg-bg-main px-4 py-2 text-text-main"
    >
      {/* Always Visible */}
      <div className="grid grid-cols-3">
        <div className="col-start-2 flex items-center justify-center gap-2 p-1 text-center text-lg">
          <Title className="size-8" />{' '}
          <span className="text-text-main">{song.title}</span>
        </div>

        <Link to={`track/${song.id}`} className="hover:text-accent">
          Select
        </Link>
      </div>

      {/* Hideable Portion */}
      <div
        className='flex justify-around'
      >
        <SongAttribute icon={<Artist className='size-8' />} attributeId='artists' attributeText={formattedArtists} />
        <SongAttribute icon={<Time />} attributeId='duration' attributeText={formattedTime} />
      </div>
    </li>
  );
};
export default ResultsTile;
