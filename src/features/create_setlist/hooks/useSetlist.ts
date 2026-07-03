import { useForm, useFieldArray } from 'react-hook-form';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import type { SongType } from '@/types/SongType';
import type { SubmitSetlistType } from '../types/SubmitSetlistType';

export interface SidebarDragData {
  song: SongType;
  origin: 'sidebar' | 'setlist';
}

export interface FormValues {
  sidebarPool: { songId: string }[];
  setlist: SubmitSetlistType[];
}

const useSetlist = (initialMasterSongs: SongType[]) => {
  // Master form tracks both dynamics workspace and setlist layouts simultaneously
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      // Sidebar starts prepoluated with
      sidebarPool: initialMasterSongs.map((song) => ({ songId: song.id })),
      setlist: [],
    },
  });

  // Creating two distinct array field pipelines from the same form control engine
  const sidebarFields = useFieldArray({ control, name: 'sidebarPool' });
  const setlistFields = useFieldArray({ control, name: 'setlist' });

  // Functional lookup: Keeps presentation layer details out of form memory
  const getSongDisplayDetails = (songId: string) => {
    return initialMasterSongs.find((song) => String(song.id) === songId);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { source, target } = event.operation;
    if (!source || !target || !isSortable(source) || !isSortable(target))
      return;

    const fromGroup = source.initialGroup as 'sidebar' | 'setlist';
    const toGroup = target.group as 'sidebar' | 'setlist';

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
    getSongDisplayDetails,
    onSubmit: handleSubmit,
  };
};

export default useSetlist;
