import SongLibrarySidebar from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import Setlist from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import type { SetlistProps } from '@/components/setlist/Setlist';
import FiltersProvider from '@/context/filters/FiltersProvider';

// Contains the song library sidebar and the setlist form. Drag and drop is
// wired per-element with pragmatic-drag-and-drop; the single monitor lives in
// useSetlist, so there's no provider to mount here.
interface SetlistEditorProps {
  sidebar: SongLibrarySidebarProps;
  setlist: SetlistProps;
}

const SetlistEditor = ({ sidebar, setlist }: SetlistEditorProps) => {
  return (
    <form
      data-cy="setlist-form"
      onSubmit={setlist.commonTileProps.onClick}
      className="flex w-full"
    >
      <FiltersProvider>
        <SongLibrarySidebar {...sidebar} />

        <Setlist {...setlist} />
      </FiltersProvider>
    </form>
  );
};
export default SetlistEditor;
