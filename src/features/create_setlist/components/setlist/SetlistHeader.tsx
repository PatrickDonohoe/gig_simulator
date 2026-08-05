import type { FormValues } from '@/features/create_setlist/hooks/useSetlist';
import type { UseFormRegister } from 'react-hook-form';
import HeaderFilters from '@/features/create_setlist/components/setlist/HeaderFilters';
import type { FilterType } from '@/hooks/useFilters';

interface SetlistHeaderProps {
  register: UseFormRegister<FormValues>;
  onClick: () => void;
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}

const SetlistHeader = ({
  register,
  onClick,
  activeFilters,
  handleFilter,
  resetFilters,
}: SetlistHeaderProps) => {
  return (
    <header className="flex flex-col bg-bg-surface">
      <div
        data-cy="title-container"
        className="grid grid-cols-2 gap-24 bg-bg-surface px-12 py-2 lg:grid-cols-3 border-b border-border-bold"
      >
        <input
          data-cy="title"
          type="text"
          className="min-w-36 rounded-xl border border-border-bold bg-bg-main text-text-main placeholder:text-text-muted p-2 lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName')}
        />
        <button
          data-cy="submit"
          type="submit"
          className="w-40 rounded-lg border border-border-bold bg-primary p-2 text-accent font-semibold"
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
