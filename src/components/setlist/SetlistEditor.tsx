import { useState } from 'react';

import SongLibrarySidebar from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import Setlist from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import type { SetlistProps } from '@/components/setlist/Setlist';
import FiltersProvider from '@/context/filters/FiltersProvider';
import SetlistsSidebar from '@/features/review_setlists/saved_setlists_sidebar/SetlistsSidebar';

// Contains the song library sidebar and the setlist form. Drag and drop is
// wired per-element with pragmatic-drag-and-drop; the single monitor lives in
// useSetlist, so there's no provider to mount here.
interface SetlistEditorProps {
  sidebar: SongLibrarySidebarProps;
  setlist: SetlistProps;
  collapsibleLibrary?: boolean; // review: true, create: false
  initialLibraryOpen?: boolean;
  headerActions?: React.ReactNode; // e.g. a Perform link
}

/**
 * 
 * @param sidebar is an array of song data.
 * @param setlist is a collection of setlist data, form data, and use-specific presentational data 
 * @param collapsibleLibrary represents a song library sidebar that can be collapsed and expanded if true (for the review page) and can't be collapsed when false. This always visible state is for the create setlist page.
 * @param initialLibraryOpen states, if present, whether the song library sidebar is open when the page loads. If this instatiation of SetlistEditor is being used on create setlist, it defaults to true. If it is used on the review setlist page, it will be set to true if there are no songs in the setlist and false if there are.
 * @param headerActions provides a slot for inserting a link to the performance mode of that setlist. This will only be provided on the review setlist page.
 * @returns 
 */

const SetlistEditor = ({
  sidebar,
  setlist,
  collapsibleLibrary = false,
  initialLibraryOpen = true,
  headerActions,
}: SetlistEditorProps) => {
  const [libraryOpen, setLibraryOpen] = useState(initialLibraryOpen);

  return (
    <form
      data-cy="setlist-form"
      onSubmit={setlist.commonTileProps.onClick}
      className="flex w-full"
    >
      <FiltersProvider>
        {/* If the setlist sidebar is on a page with a collapsible sidebar (review setlist page), display it. */}
        {collapsibleLibrary && <SetlistsSidebar />}

        {(!collapsibleLibrary || libraryOpen) && (
          <SongLibrarySidebar {...sidebar} />
        )}

        <Setlist
          {...setlist}
          headerActions={
            <>
              {collapsibleLibrary && (
                // If the button is on a page with a collapsibleLibrary (review setlist page), it will be visible.
                <button type="button" className='flex flex-row items-center justify-center order-2 @md:order-3 gap-2 rounded-lg border border-border-bold bg-primary/80 p-1 font-semibold text-accent lg:text-lg max-w-40' onClick={() => setLibraryOpen((o) => !o)}>
                  {libraryOpen ? 'Hide library' : 'Add songs'}
                </button>
              )}

              {headerActions}
            </>
          }
        />
      </FiltersProvider>
    </form>
  );
};
export default SetlistEditor;
