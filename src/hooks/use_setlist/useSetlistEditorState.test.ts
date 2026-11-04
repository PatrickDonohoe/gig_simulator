import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import useSetlistEditorState from '@/hooks/use_setlist/useSetlistEditorState';
import { useLibraryStore } from '@/stores/useLibraryStore';
import type { SongType } from '@/types/SongType';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import {
  emptySetlistFormValues,
  setlistToFormValues,
} from '@/utils/build_form_values/buildSetlistFormValues';

// The success toast renders a JSX banner through react-toastify; it isn't
// what's under test here.
vi.mock('@/utils/Toast', () => ({ notifySuccess: vi.fn() }));

const mockSongs: SongType[] = [
  {
    id: '1',
    title: 'Song One',
    artists: 'Artist One',
    key: 'C',
    mode: 'major',
    tempo: 120,
    duration: 180,
  },
  {
    id: '2',
    title: 'Song Two',
    artists: 'Artist Two',
    key: 'G',
    mode: 'minor',
    tempo: 90,
    duration: 240,
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
  ],
};

beforeEach(() => {
  useLibraryStore.setState({ librarySongs: mockSongs });
});

describe('useSetlistEditorState submit', () => {
  it('returns the create setlist form to blank values after a successful submission', async () => {
    const onSubmit = vi.fn();
    const blank = emptySetlistFormValues(mockSongs);
    const { result } = renderHook(() =>
      useSetlistEditorState(onSubmit, blank),
    );

    act(() => {
      result.current.setlist.commonTileProps.setValue(
        'setlistName',
        'Rager Party',
        { shouldDirty: true },
      );
      result.current.setlist.setlistInsert(0, { kind: 'song', songId: '2' });
    });
    expect(result.current.setlist.isDirty).toBe(true);

    await act(async () => {
      await result.current.setlist.commonTileProps.onClick();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      setlistName: 'Rager Party',
      setlist: [{ kind: 'song', songId: '2' }],
    });

    const { getValues } = result.current.setlist.commonTileProps;
    expect(getValues('setlistName')).toBe('');
    expect(getValues('setlist')).toEqual([]);
    expect(result.current.setlist.tiles).toHaveLength(0);
    expect(result.current.setlist.isDirty).toBe(false);
  });

  it('keeps the current values in the edit setlist form after a successful submission', async () => {
    const onSubmit = vi.fn();
    const saved = setlistToFormValues(mockSetlist, mockSongs);
    const { result } = renderHook(() =>
      useSetlistEditorState(onSubmit, saved, false),
    );

    act(() => {
      result.current.setlist.commonTileProps.setValue(
        'setlistName',
        'Renamed Setlist',
        { shouldDirty: true },
      );
      result.current.setlist.setlistInsert(2, { kind: 'song', songId: '2' });
    });
    expect(result.current.setlist.isDirty).toBe(true);

    await act(async () => {
      await result.current.setlist.commonTileProps.onClick();
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const { getValues } = result.current.setlist.commonTileProps;
    expect(getValues('setlistId')).toBe('sl1');
    expect(getValues('setlistName')).toBe('Renamed Setlist');
    expect(getValues('setlist')).toMatchObject([
      { kind: 'song', songId: '1' },
      {
        kind: 'transition',
        transitionId: 't1',
        notes: 'Transition 1 notes',
        transitionTime: { minutes: 2, seconds: 30 },
      },
      { kind: 'song', songId: '2' },
    ]);
    expect(result.current.setlist.tiles).toHaveLength(3);
    // The submitted values become the new baseline, so the form is clean
    // (submit disabled) until the user edits again.
    expect(result.current.setlist.isDirty).toBe(false);
  });
});
