import type { SortType } from '@/features/songs_library/hooks/sorting/useSort';
import type { SongTableRowType } from '@/types/SongType';
import Ascend from '@icons/sort-ascending-svgrepo-com.svg?react';
import Descend from '@icons/sort-descending-svgrepo-com.svg?react';

interface ColumnHeaderProps {
  headerKey: SongTableRowType;
  sortDir: SortType['dir'];
  isSortKey: boolean;
  onClick: () => void;
}

/**
 * 
 * @param headerKey is the key from SongType that is shown in the cell.
 * @param sortDir is the direction of the sort given isSortDir is true.
 * @param isSortKey determines here whether the arrow icons will appear and which direction it will face.
 * @param onClick changes the direction of the sort if isSortKey is true or changes the sort column if it is false.
 * @returns a header cell in a table that functions as a button for sorting.
 */

const ColumnHeader = ({
  headerKey,
  sortDir,
  isSortKey,
  onClick,
}: ColumnHeaderProps) => {
  return (
    <button
      id={headerKey}
      onClick={onClick}
      className={`flex items-center border border-text-main bg-bg-main p-1 capitalize hover:inset-shadow-sm ${isSortKey ? 'font-semibold text-shadow-md' : 'font-normal text-shadow-none'}`}
    >
      {headerKey}{' '}
      <span
        className={`${isSortKey ? 'opacity-100' : 'opacity-0'} size-8 text-text-main`}
      >
        {sortDir === 'asc' ? <Ascend /> : <Descend />}
      </span>
    </button>
  );
};
export default ColumnHeader;
