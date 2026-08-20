import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import type { DragEndEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

import type { SetlistRow } from '../../features/create_setlist/types/SetlistRow';
import type { SongType } from '@/types/SongType';
import { durationToSeconds } from '@/utils/add_time/addTimeDurations';
import { diffGroupedMove, toSetlistRow, type GroupedIds } from './dragOperations';

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

  // Functional lookup: Keeps presentation layer details out of form memory
  const getSongDisplayDetails = (songId: string): SongType | undefined => {
    return initialMasterSongs.find((song) => String(song.id) === songId);
  };

  // function fired at the end of the dragging event to reorder songs within the
  // same array or move from one array to another.
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return;
    const { source } = event.operation;
    if (!source) return;

    // @dnd-kit/helpers' move() correctly resolves where a drop landed
    // (whether on another tile or the empty container, which group it ends
    // up in, etc) — but it only knows about plain { id } lists, never RHF's
    // actual row data, so this is a disposable snapshot used purely to
    // compute the result. The real mutation still goes through RHF's own
    // fieldArray move/insert/remove below.
    const before: GroupedIds = {
      sidebar: sidebarFields.fields.map((f) => ({ id: f.id })),
      setlist: setlistFields.fields.map((f) => ({ id: f.id })),
    };
    const after = move(before, event);
    const resolved = diffGroupedMove(String(source.id), before, after);
    if (!resolved) return;

    const { fromGroup, fromIndex, toGroup, toIndex } = resolved;

    if (fromGroup === toGroup) {
      if (fromGroup === 'sidebar') {
        sidebarFields.move(fromIndex, toIndex);
      } else {
        setlistFields.move(fromIndex, toIndex);
      }
      return;
    }

    if (fromGroup === 'sidebar' && toGroup === 'setlist') {
      const movingData = sidebarFields.fields[fromIndex];
      setlistFields.insert(toIndex, toSetlistRow(movingData));
      sidebarFields.remove(fromIndex);
      return;
    }

    const movingData = setlistFields.fields[fromIndex];
    // setlist is mutated before sidebar (matching the other transfer branch
    // above) because it's the field array with an extra useWatch subscriber
    // (setlistDuration) — mutating it second, after another field array
    // already changed in the same tick, was leaving its fields stale.
    setlistFields.remove(fromIndex);
    sidebarFields.insert(toIndex, { songId: movingData.songId });
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
    handleSubmit,
  };
};

export default useSetlist;
