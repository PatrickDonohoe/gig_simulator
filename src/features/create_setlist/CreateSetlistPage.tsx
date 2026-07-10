import { useState, useMemo } from 'react';

import WorkspaceSidebar from './components/sidebar/WorkspaceSidebar';
import Setlist from './components/setlist/Setlist';
import useSetlist from './hooks/useSetlist';
import { getAllSongs } from '@/utils/songStorage';
import useFilters from '@/hooks/useFilters';
import type { SetlistTileType } from '@/types/SetlistTileType';
import AddSongForm from './components/AddSongForm';

// TODO: create separate common prop objects for each component with different onClick functions
const CreateSetlistPage = () => {
  const [isAddSong, setIsAddSong] = useState<boolean>(false);

  // Temporary solution to get data to the hook.
  const allSongs: SetlistTileType[] = useMemo(() => {
    return getAllSongs();
  }, []);

  const { register, getSongDisplayDetails, sidebarArr, setlistArr, onSubmitList,  } =
    useSetlist(allSongs);

  const { filters } = useFilters();

  const openAddSong = () => setIsAddSong(true);

  const commonSidebarTileProps = {
    register,
    getSongDisplayDetails,
    metaFilters: filters,
    onClick: openAddSong,
  }

  const commonSetlistTileProps = {
    register,
    getSongDisplayDetails,
    metaFilters: filters,
    onClick: onSubmitList,
  };

  return (
    <div className="grid grid-cols-[6rem_1fr]">
      <WorkspaceSidebar tiles={sidebarArr} common={commonSidebarTileProps} />
      <Setlist tiles={setlistArr} commonTileProps={commonSetlistTileProps} />

      {isAddSong && (
        <AddSongForm />
      )}
    </div>
  );
};
export default CreateSetlistPage;
