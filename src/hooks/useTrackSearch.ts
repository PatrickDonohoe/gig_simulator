import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { searchTracks } from "@/utils/recco_beats/getTracks";
import type { SearchSong } from "@/types/SearchSong";

type Params = SearchSong & { page: number };

export const useTrackSearch = (params: Params | null) => 
  useQuery({
    queryKey: ['trackSearch', params],
    queryFn: ({ signal }) => searchTracks(params!, signal),
    enabled: params !== null,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });