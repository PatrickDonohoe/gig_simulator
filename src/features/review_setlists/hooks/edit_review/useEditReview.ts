// import { useState, useMemo } from 'react';

// import type { SongType } from '@/types/SongType';
// import { getAllSongs } from '@/utils/songStorage';
// import { getSetlist } from '@/utils/setlist_storage/setlistStorage';

// /**
//  * Will need to control form state. Hold all library songs. Hold selected
//  * setlist id. Filter current setlist's songs from library songs Handle drag n
//  * drop Orchestrate prop bundles
//  */

// const useEditReview = () => {
//   const [setlistId, setSetlistId] = useState<string | undefined>(undefined);
//   const [librarySongs, setLibrarySongs] = useState<SongType[]>(getAllSongs());

//   const setlist = useMemo(() => {
//     return setlistId ? getSetlist(setlistId) : undefined;
//   }, [setlistId]);

//   // Array of songs in the sidebar minus the songs in the current setlist.
//   // Needed for song data lookup later.
//   const sidebarSongs = useMemo(() => {
//     const setlistSongs = new Set(
//       setlist?.setlistSongs.map((s) => s.songId) ?? [],
//     );
//     return librarySongs.filter((ls) => !setlistSongs.has(ls.id));
//   }, [setlist, librarySongs]);

//   // Array of sidebar song ID's.
//   const sidebarSongIDs = useMemo(() => {
//     return sidebarSongs.map((song) => ({ songId: song.id }));
//   }, [sidebarSongs]);
// };

// export default useEditReview;
