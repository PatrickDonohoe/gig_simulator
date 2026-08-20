import { useMemo } from 'react';

import SetlistEditor from '@/components/setlist/SetlistEditor';
import AddSongForm from '@/features/create_setlist/components/add_song/AddSongForm';
import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import { submitEditSetlist } from '@/features/create_setlist/services/submitFuncs';
import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import { getAllSongs } from '@/utils/songStorage';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

// Main content of ReviewSetlistPage when in 'edit' mode.
export interface SetlistEditModeProps {
  setlistId: SubmitSetlistType['setlistId'];
}

const SetlistEditMode = ({ setlistId }: SetlistEditModeProps) => {
  const librarySongs = useMemo(() => {
    return getAllSongs();
  }, []);

  const {
    sidebar,
    setlist,
    handleDragEnd,
    isAddSong,
    handleIsAddSong,
    formData,
  } = useSetlistEditorState(librarySongs, (data) =>
    submitEditSetlist({ ...data, setlistId: setlistId }),
  );

  return (
    <div>
      <div>Edit Page Header here</div>

      {/* Editor Sidebar and Form */}
      <SetlistEditor
        sidebar={sidebar}
        setlist={setlist}
        handleDragEnd={handleDragEnd}
      />

      {isAddSong && (
        <ModalBackdrop handleClose={() => handleIsAddSong(false)}>
          <AddSongForm {...formData} />
        </ModalBackdrop>
      )}
    </div>
  );
};
export default SetlistEditMode;
