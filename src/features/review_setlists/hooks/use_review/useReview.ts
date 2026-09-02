import { useState, useMemo, useEffect } from 'react';

import { durationToSeconds } from '@/utils/add_time/addTimeDurations';
import { getAllSetLists } from '@/utils/setlist_storage/setlistStorage';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import { getAllSongs } from '@/utils/songStorage';
import type { SongType } from '@/types/SongType';

const useReview = () => {
  const [selectedListId, setSelectedListId] = useState<string | undefined>(
    undefined,
  );
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

  const setlistData = useMemo<SubmitSetlistType | undefined>(() => {
    return selectedListId
      ? setlists.find((set) => set.setlistId === selectedListId)
      : undefined;
  }, [selectedListId, setlists]);

  // All display data for the songs in the selected setlist
  const songsDisplayData = useMemo<SongType[]>(() => {
    // All songs in the user's library
    const songArr = getAllSongs();

    return !setlistData
      ? []
      : setlistData.setlistSongs
          .filter((ss) => ss.kind === 'song')
          .map((row) => songArr.find((s) => s.id === row.songId))
          .filter((s): s is SongType => s !== undefined);
  }, [setlistData]);

  const setlistDuration = useMemo(() => {
    const transitionDuration = setlistData
      ? setlistData.setlistSongs
          .filter((ss) => ss.kind === 'transition')
          .reduce((sum, current) => {
            const duration = durationToSeconds(current.transitionTime);
            return sum + duration;
          }, 0)
      : 0;

    const playtime = songsDisplayData
      ? songsDisplayData.reduce((sum, current) => {
          return transitionDuration + current.duration + sum;
        }, 0)
      : 0;

    return transitionDuration + playtime;
  }, [songsDisplayData, setlistData]);

  // Used when a user makes a selection from the sidebar.
  const handleSetlist = (id: string) => {
    setlists.find((s) => s.setlistId === id);
    setSelectedListId(id);
  };

  const getSongData = (songId: string) =>
    songsDisplayData.find((song) => song.id === songId);

  return {
    songsDisplayData,
    handleSetlist,
    sidebarSetlists,
    setlistData,
    setlistDuration,
    setlists,
    getSongData,
  };
};

export default useReview;
