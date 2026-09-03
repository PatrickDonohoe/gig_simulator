import { describe, it, expect } from 'vitest';
import {
  diffGroupedMove,
  toSongRow,
  type GroupedIds,
} from '@/hooks/use_setlist/dragOperations';

describe('diffGroupedMove', () => {
  it('returns null when the item did not move', () => {
    const grouped: GroupedIds = {
      sidebar: [{ id: 'a' }, { id: 'b' }],
      setlist: [],
    };
    expect(diffGroupedMove('a', grouped, grouped)).toBeNull();
  });

  it('returns null when the id is missing from either side', () => {
    const before: GroupedIds = { sidebar: [{ id: 'a' }], setlist: [] };
    const after: GroupedIds = { sidebar: [], setlist: [] };
    expect(diffGroupedMove('a', before, after)).toBeNull();
  });

  it('resolves a reorder within the same group', () => {
    const before: GroupedIds = {
      sidebar: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      setlist: [],
    };
    const after: GroupedIds = {
      sidebar: [{ id: 'b' }, { id: 'c' }, { id: 'a' }],
      setlist: [],
    };
    expect(diffGroupedMove('a', before, after)).toEqual({
      fromGroup: 'sidebar',
      fromIndex: 0,
      toGroup: 'sidebar',
      toIndex: 2,
    });
  });

  it('resolves a sidebar-to-setlist transfer', () => {
    const before: GroupedIds = {
      sidebar: [{ id: 'a' }],
      setlist: [{ id: 'x' }],
    };
    const after: GroupedIds = {
      sidebar: [],
      setlist: [{ id: 'a' }, { id: 'x' }],
    };
    expect(diffGroupedMove('a', before, after)).toEqual({
      fromGroup: 'sidebar',
      fromIndex: 0,
      toGroup: 'setlist',
      toIndex: 0,
    });
  });

  it('resolves a setlist-to-sidebar transfer', () => {
    const before: GroupedIds = {
      sidebar: [],
      setlist: [{ id: 'a' }, { id: 'x' }],
    };
    const after: GroupedIds = {
      sidebar: [{ id: 'a' }],
      setlist: [{ id: 'x' }],
    };
    expect(diffGroupedMove('a', before, after)).toEqual({
      fromGroup: 'setlist',
      fromIndex: 0,
      toGroup: 'sidebar',
      toIndex: 0,
    });
  });
});

describe('toSongRow', () => {
  it('keeps only kind and songId, dropping the useFieldArray id', () => {
    const field = { kind: 'song' as const, songId: '5', id: 'rhf-key' };
    expect(toSongRow(field)).toEqual({ kind: 'song', songId: '5' });
  });
});
