import HeaderFilters from '@/features/create_setlist/components/setlist/HeaderFilters';
import type { FilterType } from '@/hooks/useFilters';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

export interface SetlistHeaderProps {
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
  setlistDuration: number;
  children: React.ReactNode;
}

const SetlistHeader = ({
  activeFilters,
  handleFilter,
  resetFilters,
  setlistDuration,
  children,
}: SetlistHeaderProps) => {
  const duration = timeBreakdown(setlistDuration);

  return (
    <header data-cy="setlist_header" className="flex flex-col bg-bg-surface">
      <div
        data-cy="title-container"
        className="flex gap-4 border-b border-border-bold bg-bg-surface px-2 py-2"
      >
        <div
          data-cy="time_div"
          className="border-bold flex flex-3 items-center justify-center gap-1 rounded-lg border border-border-bold bg-primary p-1 text-sm font-semibold text-accent md:text-base lg:text-lg"
        >
          <span>Total:</span>

          <span data-cy="setlist_length">
            {formatDuration(duration.hours)}:{formatDuration(duration.minutes)}:
            {formatDuration(duration.seconds)}
          </span>
        </div>

        {children}
      </div>

      {/* Filters */}
      <HeaderFilters
        activeFilters={activeFilters}
        handleFilter={handleFilter}
        resetFilters={resetFilters}
      />
    </header>
  );
};
export default SetlistHeader;
