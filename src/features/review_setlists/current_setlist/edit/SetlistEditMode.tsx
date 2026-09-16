import { useMemo } from 'react';

import SetlistEditor from '@/components/setlist/SetlistEditor';
import AddSongForm from '@/features/create_setlist/components/add_song/AddSongForm';
import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import { submitEditSetlist } from '@/features/create_setlist/services/submitFuncs';
import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import {
  emptySetlistFormValues,
  setlistToFormValues,
} from '@/utils/build_form_values/buildSetlistFormValues';
import { getSetlist } from '@/utils/setlist_storage/setlistStorage';
import { useLibraryStore } from '@/stores/useLibraryStore';

// Main content of ReviewSetlistPage when in 'edit' mode.
export interface SetlistEditModeProps {
  setlistId: SubmitSetlistType['setlistId'];
}

const SetlistEditMode = ({ setlistId }: SetlistEditModeProps) => {
  const librarySongs = useLibraryStore((state) => state.librarySongs);
  const saved = useMemo(() => getSetlist(setlistId), [setlistId]);
  const defaultValues = useMemo(
    () =>
      saved
        ? setlistToFormValues(saved, librarySongs)
        : emptySetlistFormValues(librarySongs),
    [saved, librarySongs],
  );

  const { sidebar, setlist, isSongFormOpen, closeSongForm, formData } =
    useSetlistEditorState(
      (data) => submitEditSetlist({ ...data, setlistId: setlistId }),
      defaultValues,
    );

  return (
    <div>
      <div>Edit Page Header here</div>

      {/* Editor Sidebar and Form */}
      <SetlistEditor sidebar={sidebar} setlist={setlist} />

      {isSongFormOpen && (
        <ModalBackdrop handleClose={closeSongForm}>
          <AddSongForm {...formData} />
        </ModalBackdrop>
      )}
    </div>
  );
};
export default SetlistEditMode;
