import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSetlist from '@/hooks/use_setlist/useSetlist';
import type { SongType } from '@/types/SongType';

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
];

describe('useSetlist', () => {
  it('should initialize with default form values', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    expect(result.current.getValues()).toEqual({
      setlistName: '',
      sidebar: [{ songId: '1' }, { songId: '2' }],
      setlist: [],
    });

    expect(result.current.sidebarArr).toHaveLength(2);
    expect(result.current.setlistArr).toEqual([]);
    expect(result.current.setlistDuration).toBe(0);
  });

  it('should add a new song id to sidebarFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.sidebarAppend({ songId: '5' });
    });

    expect(result.current.sidebarArr).toHaveLength(3);
    expect(result.current.sidebarArr[2]).toMatchObject({ songId: '5' });
  });

  it('should remove a song id from sidebarFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.sidebarRemove(0);
    });

    expect(result.current.sidebarArr).toHaveLength(1);
    expect(result.current.sidebarArr[0]).toMatchObject({ songId: '2' });
  });

  it('should add a song id to setlistFields', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.setlistAppend({
        songId: '2',
        notes: '',
        transitionTime: { hours: 0, minutes: 4, seconds: 35 },
      });
    });

    expect(result.current.setlistArr).toHaveLength(1);
    expect(result.current.setlistArr[0]).toMatchObject({
      songId: '2',
      notes: '',
      transitionTime: { hours: 0, minutes: 4, seconds: 35 },
    });
  });

  it('should remove a song from the setlist', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.setlistAppend({
        songId: '2',
        notes: '',
        transitionTime: { hours: 0, minutes: 4, seconds: 35 },
      });
      result.current.setlistAppend({
        songId: '5',
        notes: 'stuff',
        transitionTime: { hours: 0, minutes: 3, seconds: 22 },
      });
      result.current.setlistAppend({
        songId: '7',
        notes: 'more stuff',
        transitionTime: { hours: 0, minutes: 3, seconds: 4 },
      });
      result.current.setlistRemove(1);
    });

    expect(result.current.setlistArr).toHaveLength(2);
    expect(result.current.setlistArr[1]).toMatchObject({
      songId: '7',
      notes: 'more stuff',
      transitionTime: { hours: 0, minutes: 3, seconds: 4 },
    });
  });

  it('should get the corresponding data for matching id', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

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
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.setlistAppend({
        songId: '1',
        notes: '',
        transitionTime: { hours: 0, minutes: 0, seconds: 0 },
      });
      result.current.setlistAppend({
        songId: '2',
        notes: 'stuff',
        transitionTime: { hours: 0, minutes: 0, seconds: 0 },
      });
    });

    expect(result.current.setlistDuration).toEqual(420)
  })

  it('should calculate the correct total setlist time including transitions', () => {
    const { result } = renderHook(() => useSetlist(mockSongs));

    act(() => {
      result.current.setlistAppend({
        songId: '1',
        notes: '',
        transitionTime: { hours: 0, minutes: 4, seconds: 35 },
      });
      result.current.setlistAppend({
        songId: '2',
        notes: 'stuff',
        transitionTime: { hours: 0, minutes: 3, seconds: 22 },
      });
      
      
    });
    expect(result.current.setlistDuration).toEqual(897);
  });
});
