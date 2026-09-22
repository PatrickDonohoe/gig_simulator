import type { SongType } from "@/types/SongType"
import SongTile from "@/features/songs_library/components/song_tile/SongTile";
import useSongForm from "@/hooks/useSongForm";

interface TileViewProps {
  results: SongType[];
}

const LibraryTileView = ({ results }: TileViewProps) => {
  const { openEditSong } = useSongForm();

  return (
    <div id="tile-view">
      {results.map((tile) => (
        <SongTile key={tile.id} song={tile} openEdit={() => openEditSong(tile)} />
      ))}
    </div>
  )
}
export default LibraryTileView