import { createContext } from 'react';

import type { SongType } from '@/types/SongType';

type SongTypeKeys = keyof SongType;
export type FilterType = Exclude<SongTypeKeys, 'title' | 'id' | 'key'>;

export interface FiltersContextType {
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
);
