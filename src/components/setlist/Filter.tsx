import type { FilterType } from '@/context/filters/FiltersContext';

interface FilterProps {
  isChecked: boolean;
  id: FilterType;
  handleFilter: () => void;
}

const Filter = ({ isChecked, id, handleFilter }: FilterProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-md bg-primary px-1 text-white hover:bg-primary-hover hover:text-gray-300">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={isChecked}
        onChange={handleFilter}
      />
      <span className="capitalize">{id}</span>
    </label>
  );
};
export default Filter;
