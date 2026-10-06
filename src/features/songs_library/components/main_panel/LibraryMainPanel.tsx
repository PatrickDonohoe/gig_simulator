import { useLibraryStore } from '@/stores/useLibraryStore';
import LibraryEmpty from '@/features/songs_library/components/library_empty/LibraryEmpty';
import LibraryFilled from '@/features/songs_library/components/library_filled/LibraryFilled';

/**
 * @returns Searchbar and filters section followed by the empty or filled
 *   library of songs.
 */

const LibraryMainPanel = () => {
  const library = useLibraryStore((state) => state.librarySongs);

  return (
    <div id="library-main-panel" className="flex flex-col items-center gap-6">
      {library.length > 0 ? (
        <LibraryFilled />
      ) : (
        <LibraryEmpty />
      )}
    </div>
  );
};
export default LibraryMainPanel;
