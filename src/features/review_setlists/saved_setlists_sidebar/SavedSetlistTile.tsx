import { NavLink } from 'react-router';

import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

export interface SavedSetlistTileProps {
  set: Omit<SubmitSetlistType, 'setlistSongs'>;
}

const SavedSetlistTile = ({ set }: SavedSetlistTileProps) => {
  return (
    <NavLink
      data-cy={`sidebar-tile-${set.setlistId}`}
      className={({ isActive }) =>
        `${isActive ? 'bg-menu underline' : 'bg-bg-main'} flex max-h-18 w-full items-center justify-center rounded-xl px-4 py-2 font-semibold text-text-main hover:bg-bg-surface`
      }
      to={`/dash/review/${set.setlistId}`}
    >
      {set.setlistName}
    </NavLink>
  );
};
export default SavedSetlistTile;
