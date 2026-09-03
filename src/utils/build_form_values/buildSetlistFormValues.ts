import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import type { SongType } from '@/types/SongType';

// The sidebar (song library) is now derived at render time from
// `librarySongs` minus whatever songs are already in the setlist, so the form
// only needs to seed the setlist itself. `librarySongs` is kept in the
// signature so callers don't have to change and so it's obvious the library is
// still the other half of the picture.

export const emptySetlistFormValues = (
  _librarySongs: SongType[],
): FormValues => ({
  setlistName: '',
  setlist: [],
});

export const setlistToFormValues = (
  saved: SubmitSetlistType,
  _librarySongs: SongType[],
): FormValues => ({
  setlistId: saved.setlistId,
  setlistName: saved.setlistName,
  setlist: saved.setlistSongs,
});
