import NoDataFound from '@/components/NoDataFound';
import type { SongType } from '@/types/SongType';
import SidebarShell from '@/layouts/components/SidebarShell';
import { useContainerDrop } from '@/hooks/use_setlist/useDndTile';
import SongLibraryTile from '@/features/create_setlist/components/sidebar/song_library_tile/SongLibraryTile';

/**
 * The song library. Shows every library song that isn't already in the setlist
 * (the list is derived upstream). Dropping a setlist song back here removes it
 * from the setlist.
 */

export interface SongLibrarySidebarProps {
  songs: SongType[];
  onAddSong: () => void;
}

const SongLibrarySidebar = ({ songs, onAddSong }: SongLibrarySidebarProps) => {
  const { ref, isOver } = useContainerDrop(
    { dndType: 'sidebar-container' },
    (drag) => drag.dndType === 'setlist-row' && drag.rowKind === 'song',
  );

  const headerProps = {
    onClick: onAddSong,
    header: 'Workspace',
    buttonText: 'Add Song +',
    header2: 'Choose a song, and drag it to your setlist.',
  };

  return (
    <SidebarShell
      headerProps={headerProps}
      className="border-border-bold bg-bg-main"
    >
      <section
        data-cy="library-sidebar"
        className="mb-2 flex min-h-0 flex-1 flex-col overflow-hidden border border-border-bold bg-primary"
      >
        <div
          data-cy="wrapper_title"
          className="flex items-center justify-center border-b border-border-bold py-1"
        >
          <h2 className="text-xl font-semibold text-accent underline">
            Library
          </h2>
        </div>

        <div
          data-cy="library_wrapper"
          ref={ref}
          className={`flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto p-4 ${isOver ? 'bg-accent' : 'bg-menu'}`}
        >
          {songs.length > 0 ? (
            songs.map((song) => <SongLibraryTile key={song.id} song={song} />)
          ) : (
            <NoDataFound text="No songs to place. Add one, or drag a song back here from the setlist." />
          )}
        </div>
      </section>
    </SidebarShell>
  );
};
export default SongLibrarySidebar;
