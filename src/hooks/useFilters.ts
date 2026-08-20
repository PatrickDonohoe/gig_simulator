import { useContext } from 'react';

import {
  FiltersContext,
  type FiltersContextType,
} from '@/context/filters/FiltersContext';

const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider.');
  }

  return context;
};

export default useFilters;
