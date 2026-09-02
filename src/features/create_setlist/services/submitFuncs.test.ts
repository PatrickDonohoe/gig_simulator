import { describe, it, expect, vi } from 'vitest';
import {
  submitSetlist,
  submitEditSetlist,
} from '@/features/create_setlist/services/submitFuncs';
import { saveSetList } from '@/utils/setlist_storage/setlistStorage';
import type { FormValues } from '@/hooks/use_setlist/useSetlist';

describe('submitSetlist', () => {
  const formValues: FormValues = {
    setlistName: 'sName1a',
    sidebar: [{ kind: 'song', songId: '1a' }, { kind: 'song', songId: '2a' }, { kind: 'song', songId: '3a' }],
    setlist: [
      {
        kind: 'song',
        songId: '4a',
      },
      {
        kind: 'transition',
        transitionId: 't1',
        notes: '4a notes',
        transitionTime: {
          hours: 0,
          minutes: 0,
          seconds: 45,
        },
      },
      {
        kind: 'song',
        songId: '5a',
      },
      {
        kind: 'transition',
        transitionId: 't2',
        notes: '5a notes',
        transitionTime: {
          hours: 0,
          minutes: 1,
          seconds: 35,
        },
      },
    ],
  };

  vi.mock('@/utils/setlist_storage/setlistStorage', () => ({
    saveSetList: vi.fn(),
  }));

  it('submitSetlist saves with a freshly generated id', () => {
    submitSetlist(formValues);
    expect(saveSetList).toHaveBeenCalledWith(
      expect.objectContaining({
        setlistName: formValues.setlistName,
        setlistSongs: formValues.setlist,
      }),
    );
    const saved = vi.mocked(saveSetList).mock.calls[0][0];
    expect(saved.setlistId).toBeTruthy();
    expect(saved).not.toHaveProperty('sidebar');
  });

  it('submitEditSetlist saves under the existing setlistId, not a new one', () => {
    submitEditSetlist({ ...formValues, setlistId: 'existing-id' });
    expect(saveSetList).toHaveBeenCalledWith(
      expect.objectContaining({ setlistId: 'existing-id' }),
    );
  });
});
