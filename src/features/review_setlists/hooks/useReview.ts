import { useState, useMemo, useEffect } from 'react';

import { getAllSetLists } from '@/utils/setlist_storage/setlistStorage';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import type { SongType } from '@/types/SongType';
import type {
  SongRowType,
  TransitionType,
} from '@/features/create_setlist/types/SetlistRow';

export type ViewRow =
  | TransitionType
  | (SongRowType & { song: SongType | undefined });

const useReview = () => {
  const [setlists, setSetlists] = useState<SubmitSetlistType[]>(() =>
    getAllSetLists(),
  );

  // Refetch setlists data if the user returns to the review setlists tab.
  useEffect(() => {
    const refetch = () => setSetlists(getAllSetLists());
    window.addEventListener('focus', refetch);
    return () => window.removeEventListener('focus', refetch);
  }, []);

  // Data used to map out the setlist choices in the sidebar
  const sidebarSetlists = useMemo(() => {
    // map over each set in the setlist array extracting the id and title
    return setlists
      ? setlists.map(({ setlistId, setlistName }) => ({
          setlistId,
          setlistName,
        }))
      : [];
  }, [setlists]);

  return {
    sidebarSetlists,
    setlists,
  };
};

export default useReview;
