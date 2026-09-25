import { useState, useMemo, useCallback } from 'react';

import type { SongType } from '@/types/SongType';
import compareValues from '@/utils/compareValues';
import { useLibraryStore } from '@/stores/useLibraryStore';

/**
 * Temporary stub that will be replaced when the display components are
 * finished.
 *
 * @returns Filtered, sorted results from the library.
 */

type ColumnType = Exclude<keyof SongType, 'id' | 'instrumentation'>;

export interface SortType {
  key: ColumnType;
  dir: 'asc' | 'desc';
}

const useSort = () => {
  const [sort, setSort] = useState<SortType>({
    key: 'title',
    dir: 'asc',
  });

  const songs = useLibraryStore((state) => state.librarySongs);

  // The call to set sort column and change direction.
  const toggleSort = (nk: ColumnType) =>
    setSort((p) =>
      p?.key === nk
        ? { key: nk, dir: p.dir === 'asc' ? 'desc' : 'asc' }
        : { key: nk, dir: 'asc' },
    );

  // Compares and sorts data against the new value of sort.
  const sortItems = useCallback(
    (list: SongType[]) =>
      [...list].sort((a, b) => {
        const cmp = compareValues(a.key, b.key);
        return sort.dir === 'asc' ? cmp : -cmp;
      }),
    [sort],
  );

  // Call site of sortItems with argument.
  const sorted = useMemo(() => sortItems(songs), [sortItems, songs]);

  // Resets the sort to title, asc when changing views.
  const resetSort = () =>
    setSort((s) =>
      s.key === 'title' && s.dir == 'asc' ? s : { key: 'title', dir: 'asc' },
    );

  return {
    sortKey: sort.key,
    sortDir: sort.dir,
    sorted,
    toggleSort,
    resetSort,
  };
};

export default useSort;
// comment
