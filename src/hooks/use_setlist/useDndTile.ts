import { useEffect, useRef, useState } from 'react';

import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/adapter/element-adapter';
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

// Shared drag payloads. Every draggable/drop target in the setlist editor uses
// one of these shapes so the single monitor in useSetlist can branch on
// `dndType` without guessing.
export type DragData =
  | { dndType: 'library-song'; songId: string }
  | {
      dndType: 'setlist-row';
      rowId: string;
      index: number;
      rowKind: 'song' | 'transition';
    };

export type DropData =
  | { dndType: 'setlist-row'; rowId: string; index: number }
  | { dndType: 'setlist-container' }
  | { dndType: 'sidebar-container' };

export const isDragData = (
  data: Record<string | symbol, unknown>,
): data is DragData & Record<string | symbol, unknown> =>
  data.dndType === 'library-song' || data.dndType === 'setlist-row';

const isDropData = (
  data: Record<string | symbol, unknown>,
): data is DropData & Record<string | symbol, unknown> =>
  data.dndType === 'setlist-row' ||
  data.dndType === 'setlist-container' ||
  data.dndType === 'sidebar-container';

// A library tile: draggable only. It never accepts a drop.
export const useLibraryTile = <T extends HTMLElement = HTMLDivElement>(
  songId: string,
) => {
  const ref = useRef<T | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return draggable({
      element: el,
      getInitialData: (): DragData => ({ dndType: 'library-song', songId }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [songId]);

  return { ref, dragging };
};

// A setlist row: draggable, and a drop target that reports which edge the
// pointer is closest to so a drop indicator can be drawn.
export const useSetlistRowTile = <T extends HTMLElement = HTMLDivElement>(args: {
  rowId: string;
  index: number;
  rowKind: 'song' | 'transition';
}) => {
  const { rowId, index, rowKind } = args;
  const ref = useRef<T | null>(null);
  const [dragging, setDragging] = useState(false);
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return combine(
      draggable({
        element: el,
        getInitialData: (): DragData => ({
          dndType: 'setlist-row',
          rowId,
          index,
          rowKind,
        }),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
      }),
      dropTargetForElements({
        element: el,
        canDrop: ({ source }) => isDragData(source.data),
        getIsSticky: () => true,
        getData: ({ input, element }) =>
          attachClosestEdge(
            { dndType: 'setlist-row', rowId, index } satisfies DropData,
            { input, element, allowedEdges: ['top', 'bottom'] },
          ),
        onDrag: ({ self, source }) => {
          if (source.element === el) {
            setClosestEdge(null);
            return;
          }
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => setClosestEdge(null),
      }),
    );
  }, [rowId, index, rowKind]);

  return { ref, dragging, closestEdge };
};

// A container (the setlist column or the library column): drop target only,
// used for "drop past the last row" and "drop back to remove".
export const useContainerDrop = <T extends HTMLElement = HTMLDivElement>(
  data: DropData,
  accept: (drag: DragData) => boolean,
) => {
  const ref = useRef<T | null>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return dropTargetForElements({
      element: el,
      canDrop: ({ source }) => isDragData(source.data) && accept(source.data),
      getData: () => data as Record<string | symbol, unknown>,
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: () => setIsOver(false),
    });
    // `data` is a stable literal per call site; keying on the discriminant is
    // enough and avoids resubscribing when `accept` is re-created.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.dndType]);

  return { ref, isOver };
};

export { isDropData };
