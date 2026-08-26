import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import useSetlist, { type FormValues } from '@/hooks/use_setlist/useSetlist';
import useAddSong from '@/features/create_setlist/hooks/useAddSong';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';
import type { SetlistProps } from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';

const useSetlistEditorState = (
  initialMasterSongs: SongType[],
  onSubmit: (data: FormValues) => void,
  // initialSetlist?: SubmitSetlistType,
) => {
  const [allSongs, setAllSongs] = useState<SongType[]>(initialMasterSongs);

  const {
    register,
    setValue,
    getValues,
    watch,
    getSongDisplayDetails,
    sidebarArr,
    setlistArr,
    handleSubmit,
    setlistRemove,
    sidebarRemove,
    sidebarAppend,
    handleDragEnd,
    setlistDuration,
    errors,
    isValid,
  } = useSetlist(allSongs);

  const handleSongAdded = (newSong: SongType) => {
    setAllSongs((prev) => [...prev, newSong]);
    sidebarAppend({ songId: newSong.id });
  };

  const { formData, handleIsAddSong, isAddSong } = useAddSong(handleSongAdded);

  const commonTileProps: Omit<CommonTileProps, 'onClick' | 'onRemove' | 'isValid' | 'errors'> = {
    register,
    setValue,
    getValues,
    watch,
    getSongDisplayDetails,
  };

  const commonSidebarTileProps: CommonTileProps = {
    ...commonTileProps,
    onClick: () => handleIsAddSong(true),
    onRemove: sidebarRemove,
  };

  const commonSetlistTileProps: CommonTileProps = {
    ...commonTileProps,
    onClick: handleSubmit(onSubmit),
    onRemove: setlistRemove,
  };

  const sidebar: SongLibrarySidebarProps = {
    tiles: sidebarArr,
    common: commonSidebarTileProps,
  };

  const setlist: SetlistProps = {
    tiles: setlistArr,
    commonTileProps: commonSetlistTileProps,
    setlistDuration,
    errors,
    isValid,
  };

  return {
    sidebar,
    setlist,
    handleDragEnd,
    isAddSong,
    formData,
    handleIsAddSong,
  };
};

export default useSetlistEditorState;
