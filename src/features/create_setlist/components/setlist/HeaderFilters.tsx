import type { FilterType } from '@/hooks/useFilters';
import Filter from '@/features/create_setlist/components/setlist/Filter';

interface HeaderFilterProps {
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}

const filters: FilterType[] = [
  'artist',
  'genre',
  'tempo',
  'duration',
  'instrumentation',
];

const HeaderFilters = ({
  activeFilters,
  handleFilter,
  resetFilters,
}: HeaderFilterProps) => {
  return (
    <section className="flex items-center justify-center gap-4 pb-2">
      <h2 className="text-center text-xl font-semibold text-text-main">
        Filters:
      </h2>
      <div
        data-cy="filters"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {filters.map((f) => (
          <Filter
            key={f}
            isChecked={activeFilters.includes(f)}
            id={f}
            handleFilter={() => handleFilter(f)}
          />
        ))}

        <button
          className="flex-none rounded-md bg-bg-main px-4 font-semibold text-text-main underline ring ring-border-bold hover:bg-bg-surface hover:text-text-muted"
          onClick={resetFilters}
        >
          Clear All
        </button>
      </div>
    </section>
  );
};
export default HeaderFilters;
