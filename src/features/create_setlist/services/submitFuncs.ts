import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { FormValues } from '@/hooks/use_setlist/useSetlist';
import { saveSetList } from '@/utils/setlist_storage/setlistStorage';

// save a new setlist
export const submitSetlist = (data: FormValues) => {
  const dataWithId: SubmitSetlistType = {
    setlistId: crypto.randomUUID(),
    setlistName: data.setlistName,
    setlistSongs: data.setlist,
  };
  saveSetList(dataWithId);
};

// save edits to a setlist
export const submitEditSetlist = (data: FormValues & { setlistId: string }) => {
  const dataWithId: SubmitSetlistType = {
    setlistId: data.setlistId,
    setlistName: data.setlistName,
    setlistSongs: data.setlist,
  };

  saveSetList(dataWithId);
};
