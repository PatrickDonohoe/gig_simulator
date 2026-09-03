import { useMemo } from 'react';

import AddSongForm from './components/add_song/AddSongForm';
import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import { submitSetlist } from '@/features/create_setlist/services/submitFuncs';
import SetlistEditor from '@/components/setlist/SetlistEditor';
import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import { getAllSongs } from '@/utils/songStorage';
import { emptySetlistFormValues } from '@/utils/build_form_values/buildSetlistFormValues';

const CreateSetlistPage = () => {
  const librarySongs = useMemo(() => getAllSongs(), []);
  const defaultValues = useMemo(
    () => emptySetlistFormValues(librarySongs),
    [librarySongs],
  );
  const { sidebar, setlist, handleIsAddSong, isAddSong, formData } =
    useSetlistEditorState(librarySongs, submitSetlist, defaultValues);

  return (
    <div data-cy="page" className="flex min-h-0 flex-1">
      <SetlistEditor sidebar={sidebar} setlist={setlist} />

      {/* Modals: */}
      {isAddSong && (
        <ModalBackdrop handleClose={() => handleIsAddSong(false)}>
          <AddSongForm {...formData} />
        </ModalBackdrop>
      )}
    </div>
  );
};
export default CreateSetlistPage;
