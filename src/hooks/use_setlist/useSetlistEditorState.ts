import useSetlist, { type FormValues } from '@/hooks/use_setlist/useSetlist';
import useSongForm from '@/hooks/useSongForm';
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
  onSubmit: (data: FormValues) => void,
  defaultValues: FormValues,
) => {
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
  } = useSetlist(defaultValues);

  const { formData, openAddSong, openEditSong, closeSongForm, isSongFormOpen } =
    useSongForm();

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
