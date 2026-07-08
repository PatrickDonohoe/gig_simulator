import type { SubmitSetlistType } from '@/features/create_setlist';

const STORAGE_KEY = 'setlists';

const readAll = (): Record<string, SubmitSetlistType> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
};

export const saveSetList = (setlist: SubmitSetlistType): void => {
  const all = readAll();
  all[setlist.setlistId] = setlist;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSetlist = (setlistId: string): SubmitSetlistType | undefined =>
  readAll()[setlistId];

export const getAllSetLists = (): SubmitSetlistType[] =>
  Object.values(readAll());
