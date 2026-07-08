import { useForm, useFieldArray } from 'react-hook-form';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import type { SongType } from '@/types/SongType';
import type { SubmitSetlistType } from '../types/SubmitSetlistType';
import type { SetlistRow } from '../types/SetlistRow';
import { emptySetlist } from '../components/constants/emptySetlist';
import { saveSetList } from '@/utils/setlistStorage';

// export interface SidebarDragData {
//   song: SongType;
//   origin: 'sidebar' | 'setlist';
// }

// Using this type so that RHF can control the state of both arrays. The form will actually be submitted as just the setlist with its type.
export interface FormValues {
  setlistName: string;
  sidebarPool: { songId: string }[];
  setlist: SetlistRow[];
}

const useSetlist = (initialMasterSongs: SongType[]) => {
  // Master form tracks both dynamics workspace and setlist layouts simultaneously
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      // Sidebar starts prepoluated with
      setlistName: '',
      sidebarPool: initialMasterSongs.map((song) => ({ songId: song.id })),
      setlist: emptySetlist,
    },
  });

  // Creating two distinct array field pipelines from the same form control engine
  const sidebarFields = useFieldArray({ control, name: 'sidebarPool' });
  const setlistFields = useFieldArray({ control, name: 'setlist' });

  // Submit function that will save the setlist to local storage
  const submitSetlist = (data: FormValues) => {
    const dataWithId: SubmitSetlistType = {
      setlistId: crypto.randomUUID(),
      setlistName: data.setlistName,
      songIds: data.setlist.map((row) => row.songId),
    }
    saveSetList(dataWithId);
  }

  // Functional lookup: Retrieves name only for the sidebar
  const getSongName = (songId: string): string => {
    return initialMasterSongs.find((song) => String(song.id) === songId)?.title ?? 'not found'
  }

  // Functional lookup: Keeps presentation layer details out of form memory
  const getSongDisplayDetails = (songId: string): SongType | undefined => {
    return initialMasterSongs.find((song) => String(song.id) === songId);
  };

  // function fired at the end of the dragging event to reorder songs within the
  // same array or move from one array to another.
  const handleDragEnd = (event: DragEndEvent) => {
    // DnD establishing where the tile started and ended
    const { source, target } = event.operation;
    if (!source || !target || !isSortable(source) || !isSortable(target))
      return;

    // Labeling the source and target groups as something relevant to the component
    const fromGroup = source.initialGroup as 'sidebar' | 'setlist';
    const toGroup = target.group as 'sidebar' | 'setlist';

    // Labeling the index of the starting and ending places in their arrays.
    const fromIndex = source.initialIndex;
    const toIndex = target.index;

    // Internal movement within the same group
    if (fromGroup === toGroup) {
      if (fromIndex === toIndex) return; // if the item didn't move, return

      if (fromGroup === 'sidebar') sidebarFields.move(fromIndex, toIndex);
      if (fromGroup === 'setlist') setlistFields.move(fromIndex, toIndex);
      return;
    }

    // Transfer from sidebar -> setlist
    if (fromGroup === 'sidebar' && toGroup === 'setlist') {
      const movingData = sidebarFields.fields[fromIndex];

      // Injecting into target location
      setlistFields.insert(toIndex, {
        songId: movingData.songId,
        notes: '', // initializing default fields on arrival
        transitionTime: { hours: 0, minutes: 0, seconds: 0 }, // other default field
      });

      // Deleting song from sidebar
      sidebarFields.remove(fromIndex);
      return;
    }

    // Transfer from setlist -> sidebar
    if (fromGroup === 'setlist' && toGroup === 'sidebar') {
      const movingData = setlistFields.fields[fromIndex];

      // Adding the song to the sidebar with only the necessary data
      sidebarFields.insert(toIndex, {
        songId: movingData.songId,
      });

      // Deleting the song from the setlist
      setlistFields.remove(fromIndex);
      return;
    }
  };

  return {
    sidebarList: sidebarFields.fields,
    setlistList: setlistFields.fields,
    register,
    handleDragEnd,
    getSongName,
    getSongDisplayDetails,
    onSubmitList: handleSubmit(submitSetlist),
  };
};

export default useSetlist;
