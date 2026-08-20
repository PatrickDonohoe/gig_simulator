import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import useReview from '@/features/review_setlists/hooks/use_review/useReview';
import { getAllSetLists } from '@/utils/setlist_storage/setlistStorage';
import { getAllSongs } from '@/utils/songStorage';

vi.mock('@/utils/setlist_storage/setlistStorage', () => ({
  getAllSetLists: vi.fn(),
}));

vi.mock('@/utils/songStorage', () => ({
  getAllSongs: vi.fn(),
}));

// Setting up empty mocks.
const mockedGetAllSetLists = vi.mocked(getAllSetLists);
const mockedGetAllSongs = vi.mocked(getAllSongs);

describe('songsDisplayData', () => {


  it('should return an empty array if selectedListId is not defined', () => {
    const { result } = renderHook(() => useReview());

    expect(result.current.songsDisplayData).toStrictEqual([]);
  });

  it('should return undefined if no setlist matches the selected id', () => {
    mockedGetAllSetLists.mockReturnValue([
      { setlistId: 'a1', setlistName: 'Set A', setlistSongs: [] },
    ]);

    const { result } = renderHook(() => useReview());

    // In dataWithTrans: song with id 'does-not-exist' will not be found and thus return undefined.
    act(() => {
      result.current.handleSetlist('does-not-exist');
    });

    expect(result.current.songsDisplayData).toBe(undefined);
  });

  it('should return an empty array if the matched setlist has no corresponding songs', () => {
    mockedGetAllSetLists.mockReturnValue([
      {
        setlistId: 'a1',
        setlistName: 'Set A',
        setlistSongs: [
          {
            songId: '1',
            notes: '',
            transitionTime: { hours: 0, minutes: 0, seconds: 0 },
          },
        ],
      },
    ]);
    mockedGetAllSongs.mockReturnValue([]);

    const { result } = renderHook(() => useReview());

    act(() => {
      result.current.handleSetlist('a1');
    });

    expect(result.current.songsDisplayData).toEqual([]);
  });

  it('should join setlist rows with matching song data', () => {
    mockedGetAllSetLists.mockReturnValue([
      {
        setlistId: 'a1',
        setlistName: 'Set A',
        setlistSongs: [
          {
            songId: '1',
            notes: 'opener',
            transitionTime: { hours: 0, minutes: 0, seconds: 30 },
          },
        ],
      },
    ]);
    mockedGetAllSongs.mockReturnValue([
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
    ]);

    const { result } = renderHook(() => useReview());

    act(() => {
      result.current.handleSetlist('a1');
    });

    expect(result.current.songsDisplayData).toEqual([
      {
        id: '1',
        title: 'Song One',
        artist: 'Artist One',
        genre: 'Rock',
        key: 'C',
        tempo: '120',
        duration: 180,
        instrumentation: [],
        notes: 'opener',
        transitionTime: { hours: 0, minutes: 0, seconds: 30 },
      },
    ]);
  });
});
