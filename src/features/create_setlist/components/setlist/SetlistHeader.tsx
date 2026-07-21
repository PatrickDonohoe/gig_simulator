import type { FormValues } from "@/features/create_setlist/hooks/useSetlist"
import type { UseFormRegister } from "react-hook-form"
import HeaderFilters from "@/features/create_setlist/components/setlist/HeaderFilters";
import type { FilterType } from "@/hooks/useFilters";

interface SetlistHeaderProps {
  register: UseFormRegister<FormValues>;
  onClick: () => void;
  activeFilters: FilterType[];
  handleFilter: (f: FilterType) => void;
  resetFilters: () => void;
}

const SetlistHeader = ({ register, onClick, activeFilters, handleFilter, resetFilters }: SetlistHeaderProps) => {
  return (
    <header className="flex flex-col gap-4">
      <div
          data-cy="title-container"
          className="grid grid-cols-2 lg:grid-cols-3 bg-baby_blue_ice py-4 gap-24 px-12"
        >
          <input
            data-cy="title"
            type="text"
            className="lg:col-start-2 rounded-xl border border-midnight_violet bg-periwinkle p-2 min-w-36"
            placeholder="New Setlist #1"
            {...register('setlistName')}
          />
          <button
            data-cy="submit"
            type="submit"
            className="rounded-lg border border-midnight_violet bg-golden_apricot p-2 text-midnight_violet hover:bg-midnight_violet/25 w-40"
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
  )
}
export default SetlistHeader