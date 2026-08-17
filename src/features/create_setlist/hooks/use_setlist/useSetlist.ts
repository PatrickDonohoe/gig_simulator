import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';

import type { SubmitSetlistType } from '../../types/SubmitSetlistType';
import type { SetlistRow } from '../../types/SetlistRow';
import { saveSetList } from '@/utils/setlist_storage/setlistStorage';
import type { SongType } from '@/types/SongType';
import { durationToSeconds } from '@/utils/add_time/addTimeDurations';
import {
  resolveDragOperation,
  toSetlistRow,
  toSidebarItem,
  type Group,
} from './dragOperations';

// Need a default transition time that can be changed and reflected in the form.
// Need a sync button to make other times match.

// Using this type so that RHF can control the state of both arrays. The form will actually be submitted as just the setlist with its type.
export interface FormValues {
  setlistName: string;
  sidebar: { songId: string }[];
  setlist: SetlistRow[];
}

const useSetlist = (initialMasterSongs: SongType[]) => {
  // Master form tracks both dynamics workspace and setlist layouts simultaneously
  const { control, register, handleSubmit, setValue, getValues } =
    useForm<FormValues>({
      defaultValues: {
        // Sidebar starts prepoluated with
        setlistName: '',
        sidebar: initialMasterSongs.map((song) => ({ songId: song.id })),
        setlist: [],
      },
    });

  // Creating two distinct array field pipelines from the same form control engine
  const sidebarFields = useFieldArray({ control, name: 'sidebar' });
  const setlistFields = useFieldArray({ control, name: 'setlist' });

  // Watch the transition duration across all items in the setlist array.
  const watchedItems = useWatch({
    control,
    name: 'setlist',
  });

  // Calculate the total setlist duration.
  const setlistDuration = (watchedItems || []).reduce((sum, current) => {
    // Take "current", which represents each row of the array, and add its transformed duration property.
    const transitionDuration = durationToSeconds(current.transitionTime);
    // Retrieve duration in matching song from master song list.
    const songDuration =
      initialMasterSongs.find((song) => song.id === current.songId)?.duration ||
      0;

    return sum + transitionDuration + songDuration;
  }, 0);

  // Submit function that will save the setlist to local storage
  const submitSetlist = (data: FormValues) => {
    const dataWithId: SubmitSetlistType = {
      setlistId: crypto.randomUUID(),
      setlistName: data.setlistName,
      setlistSongs: data.setlist,
    };
    saveSetList(dataWithId);
  };

  // Functional lookup: Retrieves name only for the sidebar
  // const getSongName = (songId: string): string => {
  //   return (
  //     initialMasterSongs.find((song) => String(song.id) === songId)?.title ??
  //     'not found'
  //   );
  // };

  // Functional lookup: Keeps presentation layer details out of form memory
  const getSongDisplayDetails = (songId: string): SongType | undefined => {
    return initialMasterSongs.find((song) => String(song.id) === songId);
  };

  // function fired at the end of the dragging event to reorder songs within the
  // same array or move from one array to another.
  const handleDragEnd = (event: DragEndEvent) => {
    // DnD establishing where the tile started and ended. The dragged item is
    // always a sortable tile, but the drop target may either be another
    // sortable tile (dropped directly on it) or the plain container droppable
    // (dropped in empty space / between tiles) — the latter never satisfies
    // isSortable, so it's handled separately via its own id/length instead of
    // target.group/target.index.
    const { source, target } = event.operation;
    if (!source || !target || !isSortable(source)) return;

    // Labeling the source and target groups as something relevant to the component
    const fromGroup = source.initialGroup as Group;
    const targetIsSortable = isSortable(target);
    const toGroup = (targetIsSortable ? target.group : target.id) as Group;

    // Labeling the index of the starting and ending places in their arrays.
    const fromIndex = source.initialIndex;
    const toIndex = targetIsSortable
      ? target.index
      : toGroup === 'sidebar'
        ? sidebarFields.fields.length
        : setlistFields.fields.length;

    const operation = resolveDragOperation(
      fromGroup,
      toGroup,
      fromIndex,
      toIndex,
    );

    switch (operation.type) {
      case 'none':
        return;

      case 'move':
        if (operation.group === 'sidebar') {
          sidebarFields.move(operation.fromIndex, operation.toIndex);
        } else {
          setlistFields.move(operation.fromIndex, operation.toIndex);
        }
        return;

      case 'sidebarToSetlist': {
        const movingData = sidebarFields.fields[operation.fromIndex];
        setlistFields.insert(operation.toIndex, toSetlistRow(movingData));
        sidebarFields.remove(operation.fromIndex);
        return;
      }

      case 'setlistToSidebar': {
        const movingData = setlistFields.fields[operation.fromIndex];
        sidebarFields.insert(operation.toIndex, toSidebarItem(movingData));
        setlistFields.remove(operation.fromIndex);
        return;
      }
    }
  };

  return {
    sidebarArr: sidebarFields.fields,
    setlistArr: setlistFields.fields,
    setlistDuration,
    sidebarRemove: sidebarFields.remove,
    sidebarAppend: sidebarFields.append,
    setlistRemove: setlistFields.remove,
    setlistAppend: setlistFields.append,
    register,
    setValue,
    getValues,
    handleDragEnd,
    // getSongName,
    getSongDisplayDetails,
    onSubmitList: handleSubmit(submitSetlist),
  };
};

export default useSetlist;
