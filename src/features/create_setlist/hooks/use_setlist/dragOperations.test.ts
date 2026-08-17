import { describe, it, expect } from 'vitest';
import {
  resolveDragOperation,
  toSetlistRow,
  toSidebarItem,
} from '@/features/create_setlist/hooks/use_setlist/dragOperations';

describe('resolveDragOperation', () => {
  it('returns none when dropped in the same spot', () => {
    expect(resolveDragOperation('sidebar', 'sidebar', 2, 2)).toEqual({
      type: 'none',
    });
  });

  it('returns a move within the sidebar group', () => {
    expect(resolveDragOperation('sidebar', 'sidebar', 0, 3)).toEqual({
      type: 'move',
      group: 'sidebar',
      fromIndex: 0,
      toIndex: 3,
    });
  });

  it('returns a move within the setlist group', () => {
    expect(resolveDragOperation('setlist', 'setlist', 3, 1)).toEqual({
      type: 'move',
      group: 'setlist',
      fromIndex: 3,
      toIndex: 1,
    });
  });

  it('returns a sidebarToSetlist transfer', () => {
    expect(resolveDragOperation('sidebar', 'setlist', 1, 0)).toEqual({
      type: 'sidebarToSetlist',
      fromIndex: 1,
      toIndex: 0,
    });
  });

  it('returns a setlistToSidebar transfer', () => {
    expect(resolveDragOperation('setlist', 'sidebar', 0, 2)).toEqual({
      type: 'setlistToSidebar',
      fromIndex: 0,
      toIndex: 2,
    });
  });
});

describe('toSetlistRow', () => {
  it('adds default notes and transitionTime to a sidebar item', () => {
    expect(toSetlistRow({ songId: '5' })).toEqual({
      songId: '5',
      notes: '',
      transitionTime: { hours: 0, minutes: 0, seconds: 0 },
    });
  });
});

describe('toSidebarItem', () => {
  it('strips setlist-only fields down to just songId', () => {
    expect(
      toSidebarItem({
        songId: '5',
        notes: 'some notes',
        transitionTime: { hours: 0, minutes: 1, seconds: 30 },
      }),
    ).toEqual({ songId: '5' });
  });
});
