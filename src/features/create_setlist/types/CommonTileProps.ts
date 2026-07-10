import type { UseFormRegister } from "react-hook-form";

import type { FormValues } from "../hooks/useSetlist";
import type { SetlistTileType } from "@/types/SetlistTileType";
import type { SongType } from "@/types/SongType";

export interface CommonTileProps {
  register: UseFormRegister<FormValues>;
  getSongDisplayDetails: (songId: string) => SetlistTileType | undefined;
  metaFilters: (keyof SongType)[];
  onClick: () => void;
}