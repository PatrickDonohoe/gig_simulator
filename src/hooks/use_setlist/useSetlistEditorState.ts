import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import useSetlist, { type FormValues } from '@/hooks/use_setlist/useSetlist';
import useAddSong from '@/features/create_setlist/hooks/useAddSong';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';
import type { SetlistProps } from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';

/**
 * @param initialMasterSongs Every song in the library
 * @param onSubmit Submit handler (create form, or edit form bound to an id)
 * @returns Consolidated props for the setlist editor tree
 * @summary Combines the library song state with useAddSong and useSetlist.
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
    sidebarSongs,
    setlistArr,
    handleSubmit,
    setlistInsert,
    setlistRemove,
    setlistDuration,
    errors,
    isValid,
  } = useSetlist(allSongs, defaultValues);

  // A newly added song lands in the library, so it shows up in the derived
  // sidebar automatically — no separate sidebar mutation needed.
  const handleSongAdded = (newSong: SongType) => {
    setAllSongs((prev) => [...prev, newSong]);
  };

  const { formData, handleIsAddSong, isAddSong } = useAddSong(handleSongAdded);

  const commonTileProps: Pick<
    CommonTileProps,
    'control' | 'register' | 'setValue' | 'getValues' | 'getSongDisplayDetails'
  > = {
    control,
    register,
    setValue,
    getValues,
    getSongDisplayDetails,
  };

  const sidebar: SongLibrarySidebarProps = {
    songs: sidebarSongs,
    onAddSong: () => handleIsAddSong(true),
  };

  const setlist: SetlistProps = {
    tiles: setlistArr,
    commonTileProps: {
      ...commonTileProps,
      onClick: handleSubmit(onSubmit),
      onRemove: setlistRemove,
    },
    setlistDuration,
    errors,
    isValid,
    setlistInsert,
  };

  return {
    sidebar,
    setlist,
    isAddSong,
    formData,
    handleIsAddSong,
  };
};

export default useSetlistEditorState;
