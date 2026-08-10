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
    <header data-cy="setlist_header" className="flex flex-col bg-bg-surface">
      <div
        data-cy="title-container"
        className="flex gap-4 border-b border-border-bold bg-bg-surface px-2 py-2"
      >
        <div
          data-cy="time_div"
          className="border-bold flex flex-3 justify-center items-center gap-1 rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent text-sm md:text-base lg:text-lg"
        >
          <span>Total:</span>

          <span data-cy="setlist_length">
            {formatDuration(duration.hours)}:{formatDuration(duration.minutes)}:
            {formatDuration(duration.seconds)}
          </span>
        </div>

        <input
          data-cy="title"
          type="text"
          className="grow rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName')}
        />

        <button
          data-cy="submit"
          type="submit"
          className="flex-3 flex flex-row items-center justify-center rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent lg:text-lg gap-2"
          onClick={onClick}
        >
          <span>+</span> <span>Save Setlist</span>
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
