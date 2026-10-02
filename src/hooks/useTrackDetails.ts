import { useQuery } from '@tanstack/react-query';

import { getTrack, getTrackAudio } from '@/utils/recco_beats/getTracks';
import { reccoToFormValues } from '@/utils/recco_beats/reccoMappers';

export const useTrackDetails = (id: string | undefined) =>
  useQuery({
    queryKey: ['trackDetails', id],
    queryFn: async ({ signal }) => {
      const [track, audio] = await Promise.all([
        getTrack(id!, signal),
        getTrackAudio(id!, signal),
      ]);
      return { track, audio };
    },
    enabled: !!id,
    staleTime: Infinity,
    select: ({ track, audio }) => reccoToFormValues(track, audio),
  });
