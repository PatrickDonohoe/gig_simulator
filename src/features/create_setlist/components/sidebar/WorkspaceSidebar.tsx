import type { FieldArrayWithId } from 'react-hook-form';
import { useDroppable } from '@dnd-kit/react';

import NoDataFound from '@/components/NoDataFound';
import Library from '@/features/create_setlist/components/sidebar/Library';
import type { FormValues } from '@/features/create_setlist/hooks/use_setlist/useSetlist';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';
import SidebarShell from '@/layouts/components/SidebarShell';

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

  const HeaderProps = {
    onClick: onClick,
    header: 'Workspace',
    buttonText: 'Add Song +',
    header2: 'Choose a song, and drag it to your setlist.',
  };

  return (
    <SidebarShell
      HeaderProps={HeaderProps}
      className="border-border-bold bg-bg-main"
    >
      {/* Intended to scroll. */}
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border-bold bg-primary">
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
          className={`flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto p-4 ${isDropTarget ? 'bg-accent' : 'bg-menu'}`}
        >
          {tiles.length > 0 ? (
            <Library data-cy="library" tiles={tiles} common={rest} />
          ) : (
            <NoDataFound text="Your library is currently empty. Click the button above to add a song." />
          )}
        </div>
      </section>
    </SidebarShell>
  );
};
export default WorkspaceSidebar;
