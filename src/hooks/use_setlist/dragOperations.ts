import type { SetlistRow } from '../../features/create_setlist/types/SetlistRow';

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
  for (const group of ['sidebar', 'setlist'] as const) {
    const index = grouped[group].findIndex((item) => item.id === id);
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
  const from = locate(id, before);
  const to = locate(id, after);
  if (!from || !to) return null;

  const [fromGroup, fromIndex] = from;
  const [toGroup, toIndex] = to;
  if (fromGroup === toGroup && fromIndex === toIndex) return null;

  return { fromGroup, fromIndex, toGroup, toIndex };
};

// @dnd-kit/helpers' move() relocates an item into the setlist group as-is,
// so an item arriving from the sidebar still has the sidebar's plain
// { songId } shape. This backfills the setlist-only fields it needs.
export const toSetlistRow = (sidebarItem: { songId: string }): SetlistRow => ({
  songId: sidebarItem.songId,
  notes: '',
  transitionTime: { hours: 0, minutes: 0, seconds: 0 },
});
