import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import useSongForm from "@/features/create_setlist/hooks/song_form/useSongForm";
import { useLibraryStore } from "@/stores/useLibraryStore";
import type { SongType } from "@/types/SongType";

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

beforeEach(() => {
  useLibraryStore.setState({ librarySongs: mockSongs });
});

describe('useSongForm', () => {
  it('starts with a target value of null', () => {
    const { result } = renderHook(() => useSongForm());

    expect(result.current.target).toBeNull();
    expect(result.current.isSongFormOpen).toBeFalsy();
  });

  it('changes the target value and opens the song form when openAddSong fires', () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.openAddSong();
    });

    expect(result.current.target).toEqual('new');
    expect(result.current.isSongFormOpen).toBeTruthy();
  });
  
  it('changes the target value and opens the song form when openEditSong fires', () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.openEditSong(mockSongs[1]);
    });

    expect(result.current.target).toMatchObject(mockSongs[1]);
    expect(result.current.isSongFormOpen).toBeTruthy();
  });

  it('closes the form when closeSongForm fires (assuming that isOpen was true before)', () => {
    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.openAddSong();
      result.current.closeSongForm();
    });

    expect(result.current.isSongFormOpen).toBeFalsy();
  });

  it('fires update when handleSongSaved is called and editingSong is true', () => {
    const updateSpy = vi
      .spyOn(useLibraryStore.getState(), 'updateSong')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.openEditSong(mockSongs[1]);
    });

    act(() => {
      result.current.handleSongSaved(mockSongs[1]);
    });

    expect(updateSpy).toHaveBeenCalledWith(mockSongs[1]);
    updateSpy.mockRestore();
  });

  it('fires create when handleSongSaved is called and editingSong is false', () => {
    const createSpy = vi
      .spyOn(useLibraryStore.getState(), 'addSong')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSongForm());

    act(() => {
      result.current.openAddSong();
    });

    act(() => {
      result.current.handleSongSaved(mockSongs[0]);
    });

    expect(createSpy).toHaveBeenCalledWith(mockSongs[0]);
    createSpy.mockRestore();
  });

  it('returns early if addSong is called while target equals null', () => {
    const createSpy = vi
      .spyOn(useLibraryStore.getState(), 'addSong')
      .mockImplementation(() => {});
    const updateSpy = vi
      .spyOn(useLibraryStore.getState(), 'updateSong')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useSongForm());

    // Form was never opened, so target is still null and nothing should save.
    act(() => {
      result.current.formData.submitAddSong();
    });

    expect(createSpy).not.toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalled();

    createSpy.mockRestore();
    updateSpy.mockRestore();
  });
})