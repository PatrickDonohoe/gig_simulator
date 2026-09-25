import { useLibraryStore } from '@/stores/useLibraryStore';
import LibraryEmpty from '@/features/songs_library/components/library_empty/LibraryEmpty';
import LibraryFilled from '@/features/songs_library/components/library_filled/LibraryFilled';

import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import AddSongForm from '@/features/create_setlist/components/add_song/AddSongForm';
import useSongForm from '@/hooks/useSongForm';

/**
 * @returns Searchbar and filters section followed by the empty or filled
 *   library of songs.
 */

const LibraryMainPanel = () => {
  const library = useLibraryStore((state) => state.librarySongs);
  const { formData, openAddSong, closeSongForm, isSongFormOpen } =
    useSongForm();

  return (
    <div id="library-main-panel" className="flex flex-col gap-6">
      {library.length > 0 ? (
        <LibraryFilled />
      ) : (
        <LibraryEmpty openAddSong={openAddSong} />
      )}

      {isSongFormOpen && (
        <ModalBackdrop handleClose={closeSongForm}>
          <AddSongForm {...formData} />
        </ModalBackdrop>
      )}
    </div>
  );
};
export default LibraryMainPanel;
