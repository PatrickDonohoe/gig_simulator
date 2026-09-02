import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import type { SongType } from '@/types/SongType';

// Sets default values for the RHF when no setlist was found.
export const emptySetlistFormValues = (
  librarySongs: SongType[],
): FormValues => ({
  setlistName: '',
  sidebar: librarySongs.map((s) => ({ songId: s.id, kind: 'song' })),
  setlist: [],
});

// Sets default values for the RHF if a setlist is found.
export const setlistToFormValues = (
  saved: SubmitSetlistType,
  librarySongs: SongType[],
): FormValues => {
  // songs only
  const inSetlist = new Set(
    saved.setlistSongs.filter((r) => r.kind === 'song').map((r) => r.songId),
  );
  return {
    setlistId: saved.setlistId,
    setlistName: saved.setlistName,
    sidebar: librarySongs
      .map((ls) => ls.id)
      .filter((lsId) => !inSetlist.has(lsId))
      .map((song) => ({ songId: song, kind: 'song' })),
    setlist: saved.setlistSongs,
  };
};
