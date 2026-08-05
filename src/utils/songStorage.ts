import z from "zod";

import { type SetlistTileType, SetlistTileSchema } from "@/types/SetlistTileType";

// key for all songs data to be retrieved from local storage
const STORAGE_KEY = 'songs';

// schema to evaluate the returned record from local storage
const SongsRecordSchema = z.record(z.string(), SetlistTileSchema);

// return all songs 
const readAll = (): Record<string, SetlistTileType> => {
  const raw: string | null = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  let json: unknown;

  try {
    json = JSON.parse(raw);
  } catch (error) {
    console.error(error);
    return {};
  }
  const result = SongsRecordSchema.safeParse(json);
  return result.success ? result.data : {};
}

export const saveSong = (song: SetlistTileType): void => {
  const all = readAll();
  all[song.id] = song;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSong = (id: string): SetlistTileType | undefined => readAll()[id];

export const getAllSongs = (): SetlistTileType[] => Object.values(readAll());