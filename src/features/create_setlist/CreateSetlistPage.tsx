import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import WorkspaceSidebar from './components/sidebar/WorkspaceSidebar';
import Setlist from './components/setlist/Setlist';
import useSetlist from './hooks/useSetlist';
import { getAllSongs } from '@/utils/songStorage';
import useFilters from '@/hooks/useFilters';
import type { SetlistTileType } from '@/types/SetlistTileType';
import AddSongForm from './components/add_song/AddSongForm';
import ModalBackdrop from '@/layouts/modal_backdrop/ModalBackdrop';
import useAddSong from './hooks/useAddSong';

// TODO: create separate common prop objects for each component with different onClick functions
const CreateSetlistPage = () => {
  const [allSongs, setAllSongs] = useState<SetlistTileType[]>(() =>
    getAllSongs(),
  );

  const handleSongAdded = (newSong: SetlistTileType) => {
    setAllSongs((prev) => [...prev, newSong]);
  };

  const {
    register,
    getSongDisplayDetails,
    sidebarArr,
    setlistArr,
    onSubmitList,
    setlistRemove,
    sidebarRemove,
    handleDragEnd,
  } = useSetlist(allSongs);

  const { filters } = useFilters();

  const { formData, handleIsAddSong, isAddSong } = useAddSong(handleSongAdded);

  const commonSidebarTileProps = {
    register,
    getSongDisplayDetails,
    metaFilters: filters,
    onClick: () => handleIsAddSong(true),
    onRemove: sidebarRemove,
  };

  const commonSetlistTileProps = {
    register,
    getSongDisplayDetails,
    metaFilters: filters,
    onClick: onSubmitList,
    onRemove: setlistRemove,
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div data-cy="page" className="grid min-h-0 flex-1 grid-cols-[24rem_1fr]">
        <WorkspaceSidebar tiles={sidebarArr} common={commonSidebarTileProps} />
        <Setlist tiles={setlistArr} commonTileProps={commonSetlistTileProps} />
        {isAddSong && (
          <ModalBackdrop handleClose={() => handleIsAddSong(false)}>
            <AddSongForm {...formData} />
          </ModalBackdrop>
        )}
      </div>
    </DragDropProvider>
  );
};
export default CreateSetlistPage;
