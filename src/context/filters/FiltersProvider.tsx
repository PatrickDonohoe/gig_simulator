import { useState } from 'react';

import {
  FiltersContext,
  type FiltersContextType,
  type FilterType,
} from '@/context/filters/FiltersContext';

const FiltersProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  const handleFilter = (f: FilterType) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((pf) => pf !== f) : [...prev, f],
    );
  };

  const resetFilters = () => setActiveFilters([]);

  const value: FiltersContextType = {
    activeFilters,
    handleFilter,
    resetFilters,
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export default FiltersProvider;
