import {
  DragDropProvider,
  DragOverlay,
  type DragEndEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import SongLibrarySidebar from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import Setlist from '@/components/setlist/Setlist';
import DragPreviewCard from '@/components/DragPreviewCard';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import type { SetlistProps } from '@/components/setlist/Setlist';
import FiltersProvider from '@/context/filters/FiltersProvider';

// Contains sidebar, setlist, and draggable song card
interface SetlistEditorProps {
  sidebar: SongLibrarySidebarProps;
  setlist: SetlistProps;
  handleDragEnd: (event: DragEndEvent) => void;
}

const SetlistEditor = ({
  sidebar,
  setlist,
  handleDragEnd,
}: SetlistEditorProps) => {
  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <form
        data-cy="setlist-form"
        onSubmit={setlist.commonTileProps.onClick}
        className="flex w-full"
      >
        <FiltersProvider>
          <SongLibrarySidebar {...sidebar} />

          <Setlist {...setlist} />
        </FiltersProvider>

        {/*
          Without an explicit overlay, dnd-kit visually carries the real
          source element across the drop, which breaks when the drag crosses
          from one independent list (setlist) into a completely different one
          (sidebar) — the clone it creates for that transition doesn't get
          cleaned up. DragOverlay renders a dnd-kit-owned floating preview
          instead, decoupled from wherever the real data ends up, and is
          always torn down cleanly on drag end.
        */}
        {/*
          dropAnimation disabled: the source tile is display:none while it's
          being dragged (so sibling tiles immediately occupy its slot for
          accurate collision geometry), which means it has a zero-size rect at
          drop time — dnd-kit's default drop animation reads that rect and
          animates the overlay toward it, producing a visible flight to the
          top-left corner before React re-renders the tile back into place.
        */}

        <DragOverlay dropAnimation={null}>
          {(source) => {
            if (!isSortable(source)) return null;
            const tile =
              sidebar.tiles.find((t) => t.id === source.id) ??
              setlist.tiles.find((t) => t.id === source.id);
            const song = tile
              ? setlist.commonTileProps.getSongDisplayDetails(tile.songId)
              : undefined;
            return song ? (
              <DragPreviewCard title={song.title} duration={song.duration} />
            ) : null;
          }}
        </DragOverlay>
      </form>
    </DragDropProvider>
  );
};
export default SetlistEditor;
