import z from 'zod';

import {
  SubmitSetlistSchema,
  type SubmitSetlistType,
} from '@/features/create_setlist/types/SubmitSetlistType';

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
  // a function to retrieve the array of setlist records {setlistId: setlist}[] : {}
  const all = parseSetlistRecord();
  // retrieves that array and saves the matching setlistId with the new values from the argument.
  all[setlist.setlistId] = setlist;
  // Sets local storage with the new value of all.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSetlist = (setlistId: string): SubmitSetlistType | undefined =>
  parseSetlistRecord()[setlistId];

export const getAllSetLists = (): SubmitSetlistType[] =>
  Object.values(parseSetlistRecord());

export const removeSetlistSong = (setId: string, songId: string) => {
  // retrieves the array of setlist records.
  const all = parseSetlistRecord();
  // Separates the array of songs from the rest of the record value.
  const { setlistSongs, ...setlistRemainder } = all[setId];
  // Filters the passed song out of the songs array if it is a song and the id matches. All transitions are kept.
  const chosenSetlistRemainder = setlistSongs.filter(
    (s) => !(s.kind === 'song' && s.songId === songId),
  );
  // Mutates the setlist
  all[setId] = { setlistSongs: chosenSetlistRemainder, ...setlistRemainder };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};
