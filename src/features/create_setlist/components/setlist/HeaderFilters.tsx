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
    <section className="flex flex-col items-center justify-center pb-1">
      <h2 className="text-center text-xl font-semibold text-text-main">
        Filters:
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {filters.map((f) => (
          <Filter
            key={f}
            isChecked={activeFilters.includes(f)}
            id={f}
            handleFilter={() => handleFilter(f)}
          />
        ))}

        <button
          className="flex-none font-semibold rounded-md ring bg-bg-main ring-midnight_violet px-4 py-1 text-text-main underline hover:text-text-muted hover:bg-bg-surface"
          onClick={resetFilters}
        >
          Clear All
        </button>
      </div>
    </section>
  );
};
export default HeaderFilters;
