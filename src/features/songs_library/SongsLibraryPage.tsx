import { Outlet } from 'react-router';

import FiltersProvider from '@/context/filters/FiltersProvider';
import LibraryMainPanel from '@/features/songs_library/components/main_panel/LibraryMainPanel';

/**
 * @returns A page title, the library main panel, and possibly a "featured in"
 *   section as an aside at a later date.
 */

const SongsLibraryPage = () => {
  return (
    <FiltersProvider>
      <div id="library-page" className="flex flex-col gap-8 divide-y-2 divide-text-main">
        <div className="flex w-full items-center justify-center py-4">
          <h1
            id="library-title"
            className="text-2xl font-semibold text-text-main"
          >
            Library of Songs
          </h1>
        </div>

        <LibraryMainPanel />

        <Outlet />
      </div>
    </FiltersProvider>
  );
};
export default SongsLibraryPage;
