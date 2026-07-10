import type { SongType } from "@/types/SongType";

const useFilters = () => {
  const filters: (keyof SongType)[] = []
  return { filters };
};

export default useFilters;