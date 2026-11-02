import type { SubmitSetlistType } from "@/features/create_setlist/types/SubmitSetlistType";
import type { SongType } from "@/types/SongType";


const filterSetlistData = (items: SubmitSetlistType['setlistSongs'], library: SongType[]) => {
  const findSongData = (songId: string) => library.find(s => songId === s.id);

  return items.map(i => i.kind === "song"
    ? { kind: 'song' as const, song: findSongData(i.songId) }
    : i
  )
}

export default filterSetlistData;