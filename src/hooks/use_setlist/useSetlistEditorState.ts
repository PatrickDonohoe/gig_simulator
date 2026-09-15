import { useState } from 'react';

import type { SongType } from '@/types/SongType';
import useSetlist, { type FormValues } from '@/hooks/use_setlist/useSetlist';
import useSongForm from '@/features/create_setlist/hooks/useSongForm';
import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';
import type { SetlistProps } from '@/components/setlist/Setlist';
import type { SongLibrarySidebarProps } from '@/features/create_setlist/components/sidebar/SongLibrarySidebar';
import { notifySuccess } from '@/utils/Toast';

/**
 * @param initialMasterSongs Every song in the library
 * @param onSubmit Submit handler (create form, or edit form bound to an id)
 * @returns Consolidated props for the setlist editor tree
 * @summary Combines the library song state with useSongForm and useSetlist.
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
    reset,
    setlistInsert,
    setlistRemove,
    setlistDuration,
    errors,
    isValid,
  } = useSetlist(allSongs, defaultValues);

  // A newly added song lands in the library, so it shows up in the derived
  // sidebar automatically — no separate sidebar mutation needed. An edited
  // song is replaced in place, which also updates any setlist tile that
  // references its id via getSongDisplayDetails.
  const handleSongSaved = (song: SongType, formMode: 'add' | 'edit') => {
    switch (formMode) {
      case 'add':
        setAllSongs((prev) => [...prev, song]);
        return;
      case 'edit':
        setAllSongs((prev) => prev.map((s) => (s.id === song.id ? song : s)));
        return;
      default: {
        const _exhaustive: never = formMode;
        throw new Error('Unhandled form mode: ' + String(_exhaustive));
      }
    }
  };

  const { formData, openAddSong, openEditSong, closeSongForm, isSongFormOpen } = useSongForm(handleSongSaved);

  const handleSubmitAndReset = handleSubmit((data) => {
    onSubmit(data);
    notifySuccess(
      'Setlist Saved',
      'Setlist changes have been successfully saved.',
    );
    reset();
  });

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
    onAddSong: openAddSong,
  };

  const setlist: SetlistProps = {
    tiles: setlistArr,
    commonTileProps: {
      ...commonTileProps,
      onClick: handleSubmitAndReset,
      onRemove: setlistRemove,
      onEdit: openEditSong,
    },
    setlistDuration,
    errors,
    isValid,
    setlistInsert,
  };

  return {
    sidebar,
    setlist,
    isSongFormOpen,
    formData,
    openAddSong,
    closeSongForm,
  };
};

export default useSetlistEditorState;
