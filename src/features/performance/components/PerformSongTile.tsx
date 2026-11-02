import type { SongType } from "@/types/SongType"

interface PerformSongTileProps {
  song: SongType;
}

const PerformSongTile = ({ song }: PerformSongTileProps) => {
  return (
    <li>{song.title}</li>
  )
}
export default PerformSongTile