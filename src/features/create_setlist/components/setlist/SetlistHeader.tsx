import type { FormValues } from '@/features/create_setlist/hooks/useSetlist';
import type { UseFormRegister } from 'react-hook-form';
import HeaderFilters from '@/features/create_setlist/components/setlist/HeaderFilters';
import type { FilterType } from '@/hooks/useFilters';
import {
  timeBreakdown,
  formatDuration,
} from '@/utils/add_time/addTimeDurations';

interface SetlistHeaderProps {
  register: UseFormRegister<FormValues>;
  onClick: () => void;
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
  setlistDuration: number;
}

const SetlistHeader = ({
  register,
  onClick,
  activeFilters,
  handleFilter,
  resetFilters,
  setlistDuration,
}: SetlistHeaderProps) => {
  const duration = timeBreakdown(setlistDuration);

  return (
    <header className="flex flex-col bg-bg-surface">
      <div
        data-cy="title-container"
        className="grid grid-cols-2 gap-24 border-b border-border-bold bg-bg-surface px-12 py-2 lg:grid-cols-3"
      >
        <div className="border-bold flex flex-col gap-4 rounded-lg border bg-primary font-semibold text-accent md:flex-row">
          <span>Total Setlist Time:</span>
          <span data-cy='setlist_length'>
            {formatDuration(duration.hours)}:{formatDuration(duration.minutes)}:
            {formatDuration(duration.seconds)}
          </span>
        </div>
        <input
          data-cy="title"
          type="text"
          className="min-w-36 rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName')}
        />
        <button
          data-cy="submit"
          type="submit"
          className="w-40 rounded-lg border border-border-bold bg-primary p-2 font-semibold text-accent"
          onClick={onClick}
        >
          + Save Setlist
        </button>
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
