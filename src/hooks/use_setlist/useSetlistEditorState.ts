import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import useSetlist, { type FormValues } from '@/hooks/use_setlist/useSetlist';
import useAddSong from '@/features/create_setlist/hooks/useAddSong';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';
import type { SetlistProps } from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';

// Takes list of all songs in the library
/**
 * @param initialMasterSongs Is a list of all songs in the library
 * @param onSubmit Takes the submit function for either the edit form with id or
 *   create form without id
 * @returns Consolidated props for passing down to destination components
 * @summary used to combine the allSongs state with useAddSong and useSetlist.
 */

const useSetlistEditorState = (
  initialMasterSongs: SongType[],
  onSubmit: (data: FormValues) => void,
  defaultValues: FormValues,
) => {
  const [allSongs, setAllSongs] = useState<SongType[]>(initialMasterSongs);

  const {
    control,
    register,
    setValue,
    getValues,
    getSongDisplayDetails,
    sidebarArr,
    setlistArr,
    handleSubmit,
    setlistInsert,
    setlistRemove,
    sidebarRemove,
    sidebarAppend,
    handleDragEnd,
    setlistDuration,
    errors,
    isValid,
  } = useSetlist(allSongs, defaultValues);

  const handleSongAdded = (newSong: SongType) => {
    setAllSongs((prev) => [...prev, newSong]);
    sidebarAppend({ songId: newSong.id, kind: 'song' });
  };

  const { formData, handleIsAddSong, isAddSong } = useAddSong(handleSongAdded);

  const commonTileProps: Omit<
    CommonTileProps,
    'onClick' | 'onRemove' | 'isValid' | 'errors'
  > = {
    control,
    register,
    setValue,
    getValues,
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
    setlistInsert,
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
