import { useEffect, useMemo, useRef } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter';
import type {
  BaseEventPayload,
  ElementDragType,
} from '@atlaskit/pragmatic-drag-and-drop/types';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';

import {
  SetlistRowSchema,
  SongRowSchema,
} from '../../features/create_setlist/types/SetlistRow';
import type { SongType } from '@/types/SongType';
import { durationToSeconds } from '@/utils/add_time/addTimeDurations';
import { toSongRow } from './dragOperations';
import { isDragData } from './useDndTile';

// The form is the single source of truth for the setlist. The sidebar (the song
// library) is derived below: every library song that isn't already placed.
const FormValuesSchema = z.object({
  setlistId: z.string().optional(),
  setlistName: z.string().min(1, 'A setlist name is required.'),
  setlist: z.array(SetlistRowSchema),
});
export type FormValues = z.infer<typeof FormValuesSchema>;
type SongRow = z.infer<typeof SongRowSchema>;

const useSetlist = (
  initialMasterSongs: SongType[],
  defaultValues: FormValues,
) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(FormValuesSchema),
    mode: 'onChange',
    defaultValues,
  });

  const setlistFields = useFieldArray({ control, name: 'setlist' });

  // One subscription drives both the derived sidebar and the running total.
  const rows = useWatch({ control, name: 'setlist' }) ?? [];

  // Sidebar = library minus songs already in the setlist. Keyed on a stable
  // string so the memo only recomputes when the placed set actually changes.
  const placedKey = rows
    .filter((r): r is SongRow => r.kind === 'song')
    .map((r) => r.songId)
    .sort()
    .join('|');

  const sidebarSongs = useMemo(() => {
    const placed = new Set(placedKey ? placedKey.split('|') : []);
    return initialMasterSongs
      .filter((s) => !placed.has(s.id))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [initialMasterSongs, placedKey]);

  const setlistDuration = rows.reduce((sum, current) => {
    const duration =
      current.kind === 'transition'
        ? durationToSeconds(current.transitionTime)
        : initialMasterSongs.find((song) => song.id === current.songId)
            ?.duration || 0;
    return sum + duration;
  }, 0);

  const getSongDisplayDetails = (songId: string): SongType | undefined =>
    initialMasterSongs.find((song) => String(song.id) === songId);

  // ---- drag and drop -------------------------------------------------------
  // A single monitor owns every drop. It commits exactly one field-array
  // mutation, so there's no cross-array ordering to get wrong. The handler is
  // stashed in a ref so the monitor can mount once and always see fresh state.
  const onDropRef = useRef<
    (args: BaseEventPayload<ElementDragType>) => void
  >(() => {});

  onDropRef.current = ({ source, location }) => {
    const targets = location.current.dropTargets;
    if (targets.length === 0 || !isDragData(source.data)) return;
    const drag = source.data;

    const container = targets.find(
      (t) =>
        t.data.dndType === 'setlist-container' ||
        t.data.dndType === 'sidebar-container',
    )?.data.dndType;
    const overRow = targets.find((t) => t.data.dndType === 'setlist-row')?.data;
    const current = getValues('setlist');

    // library song -> setlist (add), unless dropped back over the library
    if (drag.dndType === 'library-song') {
      if (container === 'sidebar-container') return;
      let insertAt = current.length;
      if (overRow && typeof overRow.index === 'number') {
        const edge = extractClosestEdge(overRow);
        insertAt = overRow.index + (edge === 'bottom' ? 1 : 0);
      }
      setlistFields.insert(insertAt, toSongRow({ songId: drag.songId }));
      return;
    }

    // setlist row dropped back over the library -> remove (songs only)
    if (container === 'sidebar-container') {
      if (drag.rowKind === 'song') setlistFields.remove(drag.index);
      return;
    }

    // reorder within the setlist
    let destination = current.length - 1;
    if (overRow && typeof overRow.index === 'number') {
      destination = getReorderDestinationIndex({
        startIndex: drag.index,
        indexOfTarget: overRow.index,
        closestEdgeOfTarget: extractClosestEdge(overRow),
        axis: 'vertical',
      });
    }
    if (destination !== drag.index) setlistFields.move(drag.index, destination);
  };

  useEffect(
    () =>
      monitorForElements({
        canMonitor: ({ source }) => isDragData(source.data),
        onDrop: (args) => onDropRef.current(args),
      }),
    [],
  );

  return {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    errors,
    isValid,
    setlistArr: setlistFields.fields,
    sidebarSongs,
    setlistDuration,
    setlistInsert: setlistFields.insert,
    setlistRemove: setlistFields.remove,
    getSongDisplayDetails,
  };
};

export default useSetlist;
