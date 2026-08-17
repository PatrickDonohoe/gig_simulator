import { useState, useMemo, useEffect } from 'react';

import { durationToSeconds } from '@/utils/add_time/addTimeDurations';
import { getAllSetLists } from '@/utils/setlist_storage/setlistStorage';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import { getAllSongs } from '@/utils/songStorage';
import type { SetlistTileType } from '@/types/SetlistTileType';

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

  // All display data for the songs in the selected setlist
  const songsDisplayData = useMemo<SetlistTileType[] | undefined>(() => {
    // Setlist-specific data(notes, transition time) about each song in the selected setlist.
    const songTransitions = selectedListId
      ? setlists.find((s) => s.setlistId === selectedListId)?.setlistSongs
      : undefined;

    // All songs in the user's library
    const songArr = getAllSongs();

    // Join SetlistRow data with SongType data for each song (matching id) in a single pass,
    // since songArr.find() only returns the SongType and would otherwise lose notes/transitionTime.
    const dataWithTrans = songTransitions
      ?.map((row) => {
        const song = songArr.find((s) => s.id === row.songId);
        return song
          ? { ...song, transitionTime: row.transitionTime, notes: row.notes }
          : undefined;
      })
      // If data is not equal to undefined, remove null and undefined from its type profile.
      .filter((data): data is NonNullable<typeof data> => data !== undefined);

    return dataWithTrans;
  }, [selectedListId, setlists]);

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

  const setlistDuration = useMemo(() => {
    return songsDisplayData
      ? songsDisplayData.reduce((sum, current) => {
          const transitionDuration = durationToSeconds(current.transitionTime);
          return transitionDuration + current.duration + sum;
        }, 0)
      : 0;
  }, [songsDisplayData]);

  // Used when a user makes a selection from the sidebar.
  const handleSetlist = (id: string) => {
    setlists.find((s) => s.setlistId === id);
    setSelectedListId(id);
  };

  return {
    songsDisplayData,
    handleSetlist,
    sidebarSetlists,
    setlistData,
    setlistDuration,
  };
};

export default useReview;
