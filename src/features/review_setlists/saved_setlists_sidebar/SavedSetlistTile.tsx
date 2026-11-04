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
        // Nav-style row: the active setlist gets an accent bar and tint, not a card.
        `${isActive ? 'border-accent bg-primary/10 font-semibold text-text-main' : 'border-transparent text-text-muted hover:bg-bg-surface hover:text-text-main'} block w-full truncate rounded-r-md border-l-4 px-3 py-2`
      }
      to={`/dash/review/${set.setlistId}`}
    >
      {set.setlistName}
    </NavLink>
  );
};
export default SavedSetlistTile;
