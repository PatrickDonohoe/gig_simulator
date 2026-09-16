import { create } from 'zustand';

import type { SongType } from '@/types/SongType';
import {
  getAllSongs,
  saveSong,
  deleteSong as deleteSongFromStorage,
} from '@/utils/songStorage';

interface LibraryStore {
  librarySongs: SongType[];
  getLibrary: () => void;
  getSong: (id: string) => SongType | undefined;
  updateSong: (song: SongType) => void;
  addSong: (song: SongType) => void;
  deleteSong: (id: string) => void;
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  librarySongs: [],

  getLibrary: () => {
    // If there are already songs in the library, return that list.
    if (get().librarySongs.length > 0) return;
    // If there aren't, get all songs.
    set({ librarySongs: getAllSongs() });
  },

  getSong: (id) => get().librarySongs.find((song) => song.id === id),

  updateSong: (song) => {
    saveSong(song);
    set((state) => ({
      librarySongs: state.librarySongs.map((s) => (s.id === song.id ? song : s)),
    }));
  },

  addSong: (song) => {
    saveSong(song);
    set((state) => ({
      librarySongs: state.librarySongs.some((s) => s.id === song.id)
        ? state.librarySongs
        : [...state.librarySongs, song],
    }));
  },

  deleteSong: (id) => {
    deleteSongFromStorage(id);
    set((state) => ({
      librarySongs: state.librarySongs.filter((song) => song.id !== id),
    }));
  },
}));
