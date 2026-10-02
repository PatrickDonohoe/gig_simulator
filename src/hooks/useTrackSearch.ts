import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { searchTracks } from '@/utils/recco_beats/getTracks';
import type { SearchSong } from '@/types/SearchSong';
import { toSearchResultsPage } from '@/utils/recco_beats/reccoMappers';

type Params = SearchSong & { page: number };

/**
 * @param params Includes all search parameters Recco Beats accepts.
 * @returns The result in a tanstack query object.
 */

export const useTrackSearch = (params: Params | null) =>
  useQuery({
    queryKey: ['trackSearch', params],
    queryFn: ({ signal }) => searchTracks(params!, signal),
    enabled: params !== null,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
    select: toSearchResultsPage,
  });
