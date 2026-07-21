import type { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";

import type { FormValues } from "../hooks/useSetlist";
import type { SetlistTileType } from "@/types/SetlistTileType";
import type { FilterType } from "@/hooks/useFilters";

export interface CommonTileProps {
  register: UseFormRegister<FormValues>;
  getSongDisplayDetails: (songId: string) => SetlistTileType | undefined;
  onClick: () => void;
  onRemove: UseFieldArrayRemove;
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}