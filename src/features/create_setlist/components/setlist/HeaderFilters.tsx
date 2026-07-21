import type { FilterType } from '@/hooks/useFilters';
import Filter from '@/features/create_setlist/components/setlist/Filter';

interface HeaderFilterProps {
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}

const filters: FilterType[] = [
  'id',
  'artist',
  'genre',
  'key',
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
    <section className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-center text-xl font-semibold">Filters:</h2>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {filters.map((f) => (
          <Filter
            key={f}
            isChecked={activeFilters.includes(f)}
            id={f}
            handleFilter={() => handleFilter(f)}
          />
        ))}

        <button
          className="flex-none rounded-xl border-2 border-midnight_violet px-4 py-2 underline"
          onClick={resetFilters}
        >
          Clear All
        </button>
      </div>
    </section>
  );
};
export default HeaderFilters;
