import { createContext } from "react";

import type { SongType } from "@/types/SongType";
import type { AddSongFormProps } from "@/features/create_setlist/components/add_song/AddSongForm";

export interface SongFormContextType {
  target: SongType | 'new' | null;
  formData: AddSongFormProps;
  openAddSong: () => void;
  openEditSong: (song: SongType) => void;
  closeSongForm: () => void;
  isSongFormOpen: boolean;
  handleSongSaved: (song: SongType) => void;
}

export const SongFormContext = createContext<SongFormContextType | undefined>(undefined);