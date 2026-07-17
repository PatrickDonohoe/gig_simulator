import type { FieldArrayWithId } from 'react-hook-form';
import { useDroppable } from '@dnd-kit/react';

import NoDataFound from '@/components/NoDataFound';
import Library from '@/features/create_setlist/components/sidebar/Library';
import SidebarHeader from '@/features/create_setlist/components/sidebar/SidebarHeader';
import type { FormValues } from '@/features/create_setlist/hooks/useSetlist';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';

/**
 * Display songs moved to the workspace until assigned to a place in the
 * setlist.
 *
 * @param sidebarArr Array of song ids that have not been assigned
 */

interface SidebarProps {
  tiles: FieldArrayWithId<FormValues, 'sidebar'>[];
  common: CommonTileProps;
}

const WorkspaceSidebar = ({ tiles, common }: SidebarProps) => {
  const { onClick, ...rest } = common;
  const { ref, isDropTarget } = useDroppable({ id: 'sidebar' });

  return (
    <aside
      id="workspace_sidebar"
      className="flex min-h-0 flex-col gap-4 bg-periwinkle p-4"
    >
      <SidebarHeader onClick={onClick} />

      {/* Intended to scroll. Consider wrapping tiles instead depending on size of tile. */}
      <section
        className='flex min-h-0 flex-1 flex-col bg-golden_apricot border border-midnight_violet rounded-xl'
      >
        <div
          data-cy="wrapper_title"
          className="flex items-center justify-center border-b-2 py-1"
        >
          <h2 className="text-xl font-semibold underline">Library</h2>
        </div>

        <div
          data-cy="library_wrapper"
          ref={ref}
          className={`flex min-h-0 flex-1 flex-col rounded-b-xl ${isDropTarget ? 'bg-golden_apricot' : 'bg-gray-200'}`}
        >
          {tiles.length > 0 ? (
            <Library tiles={tiles} common={rest} />
          ) : (
            <NoDataFound text="Your library is currently empty. Click the button above to add a song." />
          )}
        </div>
      </section>
    </aside>
  );
};
export default WorkspaceSidebar;
