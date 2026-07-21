import type { FilterType } from "@/hooks/useFilters";

interface FilterProps {
  isChecked: boolean;
  id: FilterType;
  handleFilter: () => void;
}

const Filter = ({ isChecked, id, handleFilter }: FilterProps) => {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" name={id} id={id} checked={isChecked} onChange={handleFilter} />
      <span className="capitalize">{id}</span>
    </label>
  )
}
export default Filter