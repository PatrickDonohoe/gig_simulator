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
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';

const CreateSetlistPage = () => {
  const [allSongs, setAllSongs] = useState<SetlistTileType[]>(() =>
    getAllSongs(),
  );

  const {
    register,
    getSongDisplayDetails,
    sidebarArr,
    setlistArr,
    onSubmitList,
    setlistRemove,
    sidebarRemove,
    sidebarAppend,
    handleDragEnd,
  } = useSetlist(allSongs);

  const { activeFilters, handleFilter, resetFilters } = useFilters();

  const handleSongAdded = (newSong: SetlistTileType) => {
    setAllSongs((prev) => [...prev, newSong]);
    sidebarAppend({ songId: newSong.id });
  };

  const { formData, handleIsAddSong, isAddSong } = useAddSong(handleSongAdded);

  const commonTileProps: Omit<CommonTileProps, 'onClick' | 'onRemove'> = {
    register,
    getSongDisplayDetails,
    activeFilters,
    handleFilter,
    resetFilters,
  };

  const commonSidebarTileProps: CommonTileProps = {
    ...commonTileProps,
    onClick: () => handleIsAddSong(true),
    onRemove: sidebarRemove,
  };

  const commonSetlistTileProps: CommonTileProps = {
    ...commonTileProps,
    onClick: onSubmitList,
    onRemove: setlistRemove,
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div data-cy="page" className="grid min-h-0 flex-1 grid-cols-[24rem_1fr]">
        <WorkspaceSidebar tiles={sidebarArr} common={commonSidebarTileProps} />

        <Setlist tiles={setlistArr} commonTileProps={commonSetlistTileProps} />

        {/* Modals: */}
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
