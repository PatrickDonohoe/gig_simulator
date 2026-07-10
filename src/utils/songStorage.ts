import type { SetlistTileType } from "@/types/SetlistTileType";

const STORAGE_KEY = 'songs';

const readAll = (): Record<string, SetlistTileType> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export const saveSong = (song: SetlistTileType): void => {
  const all = readAll();
  all[song.id] = song;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSong = (id: string): SetlistTileType | undefined => readAll()[id];

export const getAllSongs = (): SetlistTileType[] => Object.values(readAll());