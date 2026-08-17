import z from 'zod';

import { SubmitSetlistSchema, type SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';

const SetlistRecordSchema = z.record(z.string(), SubmitSetlistSchema);

const STORAGE_KEY = 'setlists';

export const parseSetlistRecord = (): Record<string, SubmitSetlistType> => {
  const raw: string | null = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return {};
  }

  const result = SetlistRecordSchema.safeParse(json);
  return result.success ? result.data : {};
};

export const saveSetList = (setlist: SubmitSetlistType): void => {
  const all = parseSetlistRecord();
  all[setlist.setlistId] = setlist;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSetlist = (setlistId: string): SubmitSetlistType | undefined =>
  parseSetlistRecord()[setlistId];

export const getAllSetLists = (): SubmitSetlistType[] =>
  Object.values(parseSetlistRecord());
