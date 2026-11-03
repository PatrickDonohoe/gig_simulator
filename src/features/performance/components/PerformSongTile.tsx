import type { SongType } from "@/types/SongType"

interface PerformSongTileProps {
  song: SongType;
}

// TODO: Return to display additional attributes.
// Attributes will need to be stored as default 'all' or similar at new setlist submission.
// Attributes will be modified when the setlist view is edited.
// A new type/schema will need to be created to record and recall attribute data.
const PerformSongTile = ({ song }: PerformSongTileProps) => {
  return (
    <li>{song.title}</li>
  )
}
export default PerformSongTile