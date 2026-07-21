import { useState } from 'react';

import type { SongType } from '@/types/SongType';

type SongTypeKeys = keyof SongType;
export type FilterType = Exclude<SongTypeKeys, 'title'>;

const useFilters = () => {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const handleFilter = (f: FilterType) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((pf) => pf !== f) : [...prev, f],
    );
  };

  const resetFilters = () => setActiveFilters([]);

  return { activeFilters, handleFilter, resetFilters };
};

export default useFilters;
