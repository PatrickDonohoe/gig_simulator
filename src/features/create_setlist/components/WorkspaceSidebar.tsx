import type { UseFormRegister } from 'react-hook-form';
import SidebarTile from './SidebarTile';
import type { FormValues } from '../hooks/useSetlist';
import type { SetlistTileType } from '@/types/SetlistTileType';

/**
 * Display songs moved to the workspace until assigned to a place in the
 * setlist.
 *
 * @param freeSongIds Array of song ids that have not been assigned
 */

export interface WorkspaceSidebarProps {
  sidebarList: ({
    songId: string;
  } & Record<'id', string> & {
      disabled?: boolean;
    })[];
  register: UseFormRegister<FormValues>;
  getSongDisplayDetails: (songId: string) => SetlistTileType;
}

const WorkspaceSidebar = ({
  sidebarList,
  register,
  getSongDisplayDetails,
}: WorkspaceSidebarProps) => {
  return (
    <aside id="workspace_sidebar" className="flex flex-col gap-4">
      <div id="work_sidebar_headers" className="flex flex-col gap-2">
        <h1>Workspace</h1>
        <h2>Choose a song, and drag it to your setlist.</h2>
      </div>

      {/* Intended to scroll. Consider wrapping tiles instead depending on size of tile. */}
      <ul
        id="work_tile_list"
        className="flex flex-col items-center gap-2 overflow-y-auto"
      >
        {sidebarList.map((field, index) => (
          <SidebarTile
            key={field.id}
            field={field}
            index={index}
            register={register}
            getSongDisplayDetails={getSongDisplayDetails}
          />
        ))}
      </ul>
    </aside>
  );
};
export default WorkspaceSidebar;
