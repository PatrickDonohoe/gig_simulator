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
  it('should initialize with default create setlist form values', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    expect(result.current.getValues()).toMatchObject({
      setlistName: '',
      sidebar: [
        { kind: 'song', songId: '1' },
        { kind: 'song', songId: '2' },
        { kind: 'song', songId: '3' },
      ],
      setlist: [],
    });

    expect(result.current.sidebarArr).toHaveLength(3);
    expect(result.current.setlistArr).toEqual([]);
    expect(result.current.setlistDuration).toBe(0);
  });

  it('should add a new song id to sidebarFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.sidebarAppend({ kind: 'song', songId: '5' });
    });

    expect(result.current.sidebarArr).toHaveLength(4);
    expect(result.current.sidebarArr[3]).toMatchObject({ songId: '5' });
  });

  it('should remove a song id from sidebarFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.sidebarRemove(0);
    });

    expect(result.current.sidebarArr).toHaveLength(2);
    expect(result.current.sidebarArr[0]).toMatchObject({ songId: '2' });
  });

  it('should add a song id to setlistFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistAppend({
        kind: 'song',
        songId: '2',
      });
    });

    expect(result.current.setlistArr).toHaveLength(1);
    expect(result.current.setlistArr[0]).toMatchObject({
      kind: 'song',
      songId: '2',
    });
  });

  it('should remove a song from the setlist', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistAppend({
        kind: 'song',
        songId: '2',
      });
      result.current.setlistAppend({
        kind: 'song',
        songId: '5',
      });
      result.current.setlistAppend({
        kind: 'song',
        songId: '7',
      });
      result.current.setlistRemove(1);
    });

    expect(result.current.setlistArr).toHaveLength(2);
    expect(result.current.setlistArr[1]).toMatchObject({
      kind: 'song',
      songId: '7',
    });
  });

  it('should get the corresponding data for matching id', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    const data = result.current.getSongDisplayDetails('2');

    expect(data).toMatchObject({
      id: '2',
      title: 'Song Two',
      artist: 'Artist Two',
      genre: 'Jazz',
      key: 'G',
      tempo: '90',
      duration: 240,
      instrumentation: [],
    });
  });

  it('should calculate the correct total setlist time w/o transitions', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistAppend({
        kind: 'song',
        songId: '1',
      });
      result.current.setlistAppend({
        kind: 'song',
        songId: '2',
      });
    });

    expect(result.current.setlistDuration).toEqual(420);
  });

  it('should calculate the correct total setlist time including transitions', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockDefault));

    act(() => {
      result.current.setlistAppend({
        kind: 'song',
        songId: '1',
      });
      result.current.setlistInsert(1, {
        kind: 'transition',
        transitionId: 't1',
        notes: '',
        transitionTime: { hours: 0, minutes: 4, seconds: 35 },
      });
      result.current.setlistAppend({
        kind: 'song',
        songId: '2',
      });
      result.current.setlistInsert(3, {
        kind: 'transition',
        transitionId: 't2',
        notes: 'stuff',
        transitionTime: { hours: 0, minutes: 3, seconds: 22 },
      });
    });
    expect(result.current.setlistDuration).toEqual(897);
  });
});

describe('useSetlist in edit mode', () => {
  it('should initialize with the default values when provided', () => {
    const { result } = renderHook(() => useSetlist(mockSongs, mockValues));

    expect(result.current.getValues()).toMatchObject({
      setlistId: mockSetlist.setlistId,
      setlistName: mockSetlist.setlistName,
      sidebar: [{ kind: 'song', songId: '3' }],
    });

    expect(result.current.sidebarArr).toHaveLength(1);
    expect(result.current.setlistArr).toHaveLength(3);
    expect(result.current.setlistDuration).toBe(570);
  });
});
