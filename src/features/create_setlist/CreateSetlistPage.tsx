import { useMemo } from 'react';

import AddSongForm from './components/add_song/AddSongForm';
import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import { submitSetlist } from '@/features/create_setlist/services/submitFuncs';
import SetlistEditor from '@/components/setlist/SetlistEditor';
import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import { emptySetlistFormValues } from '@/utils/build_form_values/buildSetlistFormValues';
import { useLibraryStore } from '@/stores/useLibraryStore';

const CreateSetlistPage = () => {
  const librarySongs = useLibraryStore((state) => state.librarySongs);
  const defaultValues = useMemo(
    () => emptySetlistFormValues(librarySongs),
    [librarySongs],
  );
  const { sidebar, setlist, closeSongForm, isSongFormOpen, formData } =
    useSetlistEditorState(submitSetlist, defaultValues);

  return (
    <div data-cy="page" className="flex min-h-0 flex-1">
      <SetlistEditor sidebar={sidebar} setlist={setlist} />

      {/* Modals: */}
      {isSongFormOpen && (
        <ModalBackdrop handleClose={closeSongForm}>
          <AddSongForm {...formData} />
        </ModalBackdrop>
      )}
    </div>
  );
};
export default CreateSetlistPage;
