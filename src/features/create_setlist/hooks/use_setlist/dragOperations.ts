import type { SetlistRow } from '../../types/SetlistRow';

export type Group = 'sidebar' | 'setlist';

export type DragOperation =
  | { type: 'none' }
  | { type: 'move'; group: Group; fromIndex: number; toIndex: number }
  | { type: 'sidebarToSetlist'; fromIndex: number; toIndex: number }
  | { type: 'setlistToSidebar'; fromIndex: number; toIndex: number };

// Decides what a drag from (fromGroup, fromIndex) to (toGroup, toIndex) means,
// independent of dnd-kit's event/element types so it can be unit tested directly.
export const resolveDragOperation = (
  fromGroup: Group,
  toGroup: Group,
  fromIndex: number,
  toIndex: number,
): DragOperation => {
  if (fromGroup === toGroup) {
    if (fromIndex === toIndex) return { type: 'none' };
    return { type: 'move', group: fromGroup, fromIndex, toIndex };
  }

  if (fromGroup === 'sidebar' && toGroup === 'setlist') {
    return { type: 'sidebarToSetlist', fromIndex, toIndex };
  }

  if (fromGroup === 'setlist' && toGroup === 'sidebar') {
    return { type: 'setlistToSidebar', fromIndex, toIndex };
  }

  return { type: 'none' };
};

export const toSetlistRow = (sidebarItem: { songId: string }): SetlistRow => ({
  songId: sidebarItem.songId,
  notes: '',
  transitionTime: { hours: 0, minutes: 0, seconds: 0 },
});

export const toSidebarItem = (setlistRow: SetlistRow): { songId: string } => ({
  songId: setlistRow.songId,
});
