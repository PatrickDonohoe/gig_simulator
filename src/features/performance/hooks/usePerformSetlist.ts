import { useRouteLoaderData } from 'react-router';

import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import filterSetlistData from '@/features/performance/utils/filterSetlistData';
import { useLibraryStore } from '@/stores/useLibraryStore';
import { durationToSeconds } from '@/utils/add_time/addTimeDurations';

type SetlistData = ReturnType<typeof filterSetlistData>;
type SetlistItem = SetlistData[number];
type SongItem = Extract<SetlistItem, { kind: 'song' }>;

const isSong = (item: SetlistItem): item is SongItem => item.kind === 'song';

const itemSeconds = (item: SetlistItem): number =>
  isSong(item)
    ? (item.song?.duration ?? 0)
    : durationToSeconds(item.transitionTime);

// Returns a new array of setlist data that includes a position for each song based on the length of an array of only songs that increases with the original item's index.
// A song's position is the number of songs up to and including it.
const withPositions = (items: SetlistData) =>
  items.map((item, i) =>
    isSong(item)
      ? { ...item, position: items.slice(0, i + 1).filter(isSong).length }
      : item,
  );

// Gathers everything the perform view needs from the saved setlist (loaded in
// DashRoutes from the setlist id in the URL) and the song library.
const usePerformSetlist = () => {
  const saved = useRouteLoaderData('setlist') as SubmitSetlistType;
  const librarySongs = useLibraryStore((s) => s.librarySongs);
  const items = filterSetlistData(saved.setlistSongs, librarySongs);

  return {
    name: saved.setlistName,
    tiles: withPositions(items),
    songCount: items.filter(isSong).length,
    runtimeSeconds: items.reduce((total, item) => total + itemSeconds(item), 0),
  };
};

export type PerformTile = ReturnType<typeof withPositions>[number];

export default usePerformSetlist;
