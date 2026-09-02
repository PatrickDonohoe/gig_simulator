import { describe, it, expect, beforeEach } from 'vitest';

import {
  saveSetList,
  getSetlist,
  getAllSetLists,
} from '@/utils/setlist_storage/setlistStorage';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

const setlistA1: SubmitSetlistType = {
  setlistId: 'a1',
  setlistName: 'A 1',
  setlistSongs: [
    {
      kind: 'song',
      songId: 'sa1',
    },
    {
      kind: 'transition',
      transitionId: 't1',
      transitionTime: { hours: 0, minutes: 1, seconds: 5 },
      notes: 'Do this quickly.',
    },
    {
      kind: 'song',
      songId: 'sa2',
    },
    {
      kind: 'transition',
      transitionId: 't2',
      transitionTime: { hours: 0, minutes: 3, seconds: 9 },
      notes: 'Tell a story about a bear.',
    },
  ],
};

const newSetlist: SubmitSetlistType = {
  setlistId: '2b',
  setlistName: 'Second List',
  setlistSongs: [],
};

describe('getAllSetLists', () => {
  beforeEach(() => {
    localStorage.clear();
    saveSetList(setlistA1);
    saveSetList(newSetlist);
  });

  it('retrieves all setlists in an array', () => {
    expect(getAllSetLists()).toHaveLength(2);
    expect(getAllSetLists()).toContainEqual(newSetlist);
  });
});

describe('saveSetlist', () => {
  beforeEach(() => {
    localStorage.clear();
    saveSetList(setlistA1);
  });

  it('returns the setlists record', () => {
    expect(getAllSetLists()).toHaveLength(1);
    expect(getAllSetLists()).toContainEqual(
      expect.objectContaining({ setlistId: 'a1' }),
    );
  });

  it('adds a setlist', () => {
    saveSetList(newSetlist);

    expect(getAllSetLists()).toHaveLength(2);
  });
});

describe('getSetlist', () => {
  beforeEach(() => {
    localStorage.clear();
    saveSetList(setlistA1);
    saveSetList(newSetlist);
  });

  it('retrieves setlist by id', () => {
    expect(getSetlist('2b')).toMatchObject(newSetlist);
  });
});
