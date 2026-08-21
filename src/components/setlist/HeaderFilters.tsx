import useFilters from '@/hooks/useFilters';
import type { FilterType } from '@/context/filters/FiltersContext';
import Filter from '@/components/setlist/Filter';

export interface HeaderFilterProps {
  noSetlist: boolean;
}

const filters: FilterType[] = [
  'artist',
  'genre',
  'tempo',
  'duration',
  'instrumentation',
];

const HeaderFilters = () => {
  const { activeFilters, handleFilter, resetFilters } = useFilters();
  
  return (
    <section className="flex items-center justify-center gap-4 p-2">
      <h2 className="text-center text-xl font-semibold text-text-main">
        Filters:
      </h2>
      <div
        data-cy="filters"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-2 border-border-bold rounded-lg p-2"
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
          // disabled={noSetlist}
        >
          Clear All
        </button>
      </div>
    </section>
  );
};
export default HeaderFilters;
