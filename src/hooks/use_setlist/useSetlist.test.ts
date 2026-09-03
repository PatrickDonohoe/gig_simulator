import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import useSetlist from '@/hooks/use_setlist/useSetlist';
import type { SongType } from '@/types/SongType';
import {
  emptySetlistFormValues,
  setlistToFormValues,
} from '@/utils/build_form_values/buildSetlistFormValues';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

const mockSongs: SongType[] = [
  {
    id: '1',
    title: 'Song One',
    artist: 'Artist One',
    genre: 'Rock',
    key: 'C',
    tempo: '120',
    duration: 180,
    instrumentation: [],
  },
  {
    id: '2',
    title: 'Song Two',
    artist: 'Artist Two',
    genre: 'Jazz',
    key: 'G',
    tempo: '90',
    duration: 240,
    instrumentation: [],
  },
  {
    id: '3',
    title: 'Song Three',
    artist: 'Artist Three',
    genre: 'Hip-Hop',
    key: 'D',
    tempo: '120',
    duration: 400,
    instrumentation: [],
  },
];

const mockSetlist: SubmitSetlistType = {
  setlistId: 'sl1',
  setlistName: 'Setlist1',
  setlistSongs: [
    { kind: 'song', songId: '1' },
    {
      kind: 'transition',
      transitionId: 't1',
      notes: 'Transition 1 notes',
      transitionTime: { minutes: 2, seconds: 30 },
    },
    { kind: 'song', songId: '2' },
  ],
};

const mockDefault = emptySetlistFormValues(mockSongs);
const mockValues = setlistToFormValues(mockSetlist, mockSongs);

describe('useSetlist', () => {
  it('starts with an empty setlist and the whole library in the sidebar', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    expect(result.current.setlistArr).toEqual([]);
    expect(result.current.setlistDuration).toBe(0);
    // sidebar is derived and sorted by title: One, Three, Two
    expect(result.current.sidebarSongs.map((s) => s.id)).toEqual([
      '1',
      '3',
      '2',
    ]);
  });

  it('drops a placed song out of the derived sidebar', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistInsert(0, { kind: 'song', songId: '1' });
    });

    expect(result.current.setlistArr).toHaveLength(1);
    expect(result.current.sidebarSongs.map((s) => s.id)).toEqual(['3', '2']);
  });

  it('returns a song to the sidebar when it leaves the setlist', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistInsert(0, { kind: 'song', songId: '2' });
    });
    act(() => {
      result.current.setlistRemove(0);
    });

    expect(result.current.setlistArr).toEqual([]);
    expect(result.current.sidebarSongs.map((s) => s.id)).toContain('2');
  });

  it('looks up display details by id', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    expect(result.current.getSongDisplayDetails('2')).toMatchObject({
      id: '2',
      title: 'Song Two',
      duration: 240,
    });
  });

  it('totals song durations', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistInsert(0, { kind: 'song', songId: '1' });
      result.current.setlistInsert(1, { kind: 'song', songId: '2' });
    });

    expect(result.current.setlistDuration).toBe(420);
  });

  it('totals song durations plus transitions', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistInsert(0, { kind: 'song', songId: '1' });
      result.current.setlistInsert(1, {
        kind: 'transition',
        transitionId: 't1',
        notes: '',
        transitionTime: { hours: 0, minutes: 4, seconds: 35 },
      });
      result.current.setlistInsert(2, { kind: 'song', songId: '2' });
      result.current.setlistInsert(3, {
        kind: 'transition',
        transitionId: 't2',
        notes: 'stuff',
        transitionTime: { hours: 0, minutes: 3, seconds: 22 },
      });
    });

    expect(result.current.setlistDuration).toBe(897);
  });
});

describe('useSetlist in edit mode', () => {
  it('hydrates the setlist and derives the remaining sidebar', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockValues));

    expect(result.current.getValues()).toMatchObject({
      setlistId: mockSetlist.setlistId,
      setlistName: mockSetlist.setlistName,
    });
    expect(result.current.setlistArr).toHaveLength(3);
    expect(result.current.sidebarSongs.map((s) => s.id)).toEqual(['3']);
    expect(result.current.setlistDuration).toBe(570);
  });
});
