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
 * @param headerKey Is the key from SongType that is shown in the cell.
 * @param sortDir Is the direction of the sort given isSortDir is true.
 * @param isSortKey Determines here whether the arrow icons will appear and
 *   which direction it will face.
 * @param onClick Changes the direction of the sort if isSortKey is true or
 *   changes the sort column if it is false.
 * @returns A header cell in a table that functions as a button for sorting.
 */

const ColumnHeader = ({
  headerKey,
  sortDir,
  isSortKey,
  onClick,
}: ColumnHeaderProps) => {
  return (
    <th
      scope="col"
      aria-sort={
        isSortKey ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined
      }
      className='w-full'
    >
      <button
        id={headerKey}
        type="button"
        onClick={onClick}
        className={`flex justify-between w-full items-center gap-2 bg-bg-main p-1 capitalize hover:inset-shadow-sm ${isSortKey ? 'font-semibold text-shadow-md' : 'font-normal text-shadow-none'}`}
      >
        {headerKey}{' '}
        <span
          aria-hidden
          className={`${isSortKey ? 'opacity-100' : 'opacity-0'} size-8 text-text-main`}
        >
          {sortDir === 'asc' ? <Ascend className='size-8' /> : <Descend className='size-8' />}
        </span>
      </button>
    </th>
  );
};
export default ColumnHeader;
