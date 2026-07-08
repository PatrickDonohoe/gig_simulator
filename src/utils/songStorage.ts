import type { SongType } from "@/types/SongType";

const STORAGE_KEY = 'songs';

const readAll = (): Record<string, SongType> => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export const saveSong = (song: SongType): void => {
  const all = readAll();
  all[song.id] = song;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};

export const getSong = (id: string): SongType | undefined => readAll()[id];

export const getAllSongs = (): SongType[] => Object.values(readAll());