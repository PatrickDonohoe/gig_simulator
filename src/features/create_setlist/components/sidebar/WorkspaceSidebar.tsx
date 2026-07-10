import type { FieldArrayWithId } from 'react-hook-form';

import SidebarTile from '../SidebarTile';
import type { CommonTileProps } from '../../types/CommonTileProps';
import type { FormValues } from '../../hooks/useSetlist';
import NoDataFound from '@/components/NoDataFound';

/**
 * Display songs moved to the workspace until assigned to a place in the
 * setlist.
 *
 * @param sidebarArr Array of song ids that have not been assigned
 */

export interface WorkspaceSidebarProps {
  tiles: FieldArrayWithId<FormValues, 'sidebarPool'>[];
  common: CommonTileProps;
}

const WorkspaceSidebar = ({ tiles, common }: WorkspaceSidebarProps) => {
  return (
    <aside id="workspace_sidebar" className="flex flex-col gap-4 p-4 bg-periwinkle rounded-xl">
      <div id="work_sidebar_headers" className="flex flex-col">
        <div className="flex justify-between items-center p-2 bg-golden_apricot">
          <h1 data-cy="h1">Workspace</h1>

          <button className="flex-none py-1 px-2 border rounded-xl bg-muted_teal">Add Song</button>
        </div>
        <h2 data-cy="h2" className='bg-muted_teal p-2'>Choose a song, and drag it to your setlist.</h2>
      </div>

      {/* Intended to scroll. Consider wrapping tiles instead depending on size of tile. */}
      {tiles.length > 0 ? (
        <ul
          id="work_tile_list"
          data-cy='work_tile_list'
          className="flex flex-col items-center gap-2 overflow-y-auto bg-gray-100 rounded-xl p-4"
        >
          {tiles.map((t, index) => (
            <SidebarTile
              key={t.id}
              field={t}
              commonTileProps={common}
              index={index}
            />
          ))}
        </ul>
      ) : (
        <NoDataFound />
      )}
    </aside>
  );
};
export default WorkspaceSidebar;
