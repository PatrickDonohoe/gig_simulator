import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';

// This can be rewritten as a group of direct lookups by id when a db or indexed db are added.
const filterSetlistData = (
  items: SubmitSetlistType['setlistSongs'],
  library: SongType[],
) => {
  const findSongData = (songId: string) => library.find((s) => songId === s.id);

  return items.map((i) =>
    i.kind === 'song'
      ? {
          kind: 'song' as const,
          songId: i.songId,
          song: findSongData(i.songId),
        }
      : i,
  );
};

export default filterSetlistData;
