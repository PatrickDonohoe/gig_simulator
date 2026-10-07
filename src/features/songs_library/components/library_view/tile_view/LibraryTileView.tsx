import type { SongType } from '@/types/SongType';
import SongTile from '@/components/song_tile/SongTile';

interface TileViewProps {
  results: SongType[];
}

const LibraryTileView = ({ results }: TileViewProps) => {
  return (
    <div id="tile-view">
      {results.map((tile) => (
        <SongTile key={tile.id} song={tile} />
      ))}
    </div>
  );
};
export default LibraryTileView;
