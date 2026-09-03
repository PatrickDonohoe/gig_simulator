import SongLibraryTile from '@/features/create_setlist/components/sidebar/song_library_tile/SongLibraryTile';
import type { SongType } from '@/types/SongType';

export interface SongLibraryListProps {
  songs: SongType[];
}

const SongLibraryList = ({ songs }: SongLibraryListProps) => {
  return songs.map((song) => <SongLibraryTile key={song.id} song={song} />);
};
export default SongLibraryList;
