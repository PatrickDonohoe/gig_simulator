import type { SongRowType } from '../../features/create_setlist/types/SetlistRow';

export type Group = 'sidebar' | 'setlist';

// A plain Record (not a hand-written interface) so it structurally satisfies
// @dnd-kit/helpers' Record<UniqueIdentifier, Items> constraint.
export type GroupedIds = Record<Group, { id: string }[]>;

export interface ResolvedMove {
  fromGroup: Group;
  fromIndex: number;
  toGroup: Group;
  toIndex: number;
}

const locate = (id: string, grouped: GroupedIds): [Group, number] | null => {
  // for loop using variable "group" as a string literal of sidebar or setlist
  for (const group of ['sidebar', 'setlist'] as const) {
    // Searches through each group looking for where the id's match or returning -1
    const index = grouped[group].findIndex((item) => item.id === id);
    // If the matching id was found, return the tuple of the group containing the id and its index
    if (index !== -1) return [group, index];
  }
  return null;
};

// @dnd-kit/helpers' move() already knows how to resolve a drop correctly
// (whether it lands on another tile or on the empty container, which group
// it ends up in, live optimistic-sort positions, etc). This just diffs its
// before/after id order to find where the dragged item ended up, independent
// of dnd-kit's event/element types so it can be unit tested directly.
export const diffGroupedMove = (
  id: string,
  before: GroupedIds,
  after: GroupedIds,
): ResolvedMove | null => {
  // Finding the group and index before movement and after.
  const from = locate(id, before);
  const to = locate(id, after);
  if (!from || !to) return null;

  // Declaring constants as not null after null return.
  const [fromGroup, fromIndex] = from;
  const [toGroup, toIndex] = to;
  // If the item did not move, return null.
  if (fromGroup === toGroup && fromIndex === toIndex) return null;

  return { fromGroup, fromIndex, toGroup, toIndex };
};

// A song row is identical in the sidebar and the setlist ({ kind: 'song',
// songId }), so this isn't a shape conversion — it just drops the `id` key
// useFieldArray injects onto `fields` entries so it doesn't leak into form
// state when the row is re-inserted into the other array.
export const toSongRow = ({ songId }: { songId: string }): SongRowType => ({
  kind: 'song',
  songId,
});
