import FiltersProvider from "@/context/filters/FiltersProvider";
import LibraryMainPanel from "@/features/songs_library/components/main_panel/LibraryMainPanel";
import SongFormProvider from "@/context/song_form/SongFormProvider";

/**
 * @returns A page title, the library main panel, and possibly a "featured in"
 *   section as an aside at a later date.
 */

const SongsLibraryPage = () => {

  return (
    <FiltersProvider>
      <SongFormProvider>
        <div id="library-page" className="flex flex-col gap-8">
          <div className="flex w-full items-center justify-center">
            <h1
              id="library-title"
              className="text-2xl font-semibold text-text-main"
            >
              Library of Songs
            </h1>
          </div>
          <LibraryMainPanel />
        </div>
      </SongFormProvider>
    </FiltersProvider>
  );
};
export default SongsLibraryPage;
