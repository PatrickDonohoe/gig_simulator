import { useState } from 'react';
import { arrayMove } from '@dnd-kit/helpers';

export const useDragNDrop = () => {
  const [setlistIds, setSetlistIds] = useState<number[]>([]);
  const [workspaceIds, setWorkspaceIds] = useState<number[]>([]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Helper to find which list an item belongs to
    const findContainer = (id: number) => {
      if (setlistIds.includes(id) || id === 'main-list') return 'main';
      if (workspaceIds.includes(id) || id === 'holding-zone') return 'holding';
      return null;
    };

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    // Case 1: Reordering within the same container
    if (activeContainer === overContainer) {
      if (activeId !== overId) {
        if (activeContainer === 'main') {
          setSetlistIds((prev) =>
            arrayMove(prev, prev.indexOf(activeId), prev.indexOf(overId)),
          );
        } else {
          setWorkspaceIds((prev) =>
            arrayMove(prev, prev.indexOf(activeId), prev.indexOf(overId)),
          );
        }
      }
    }
    // Case 2: Moving between different containers
    else {
      if (activeContainer === 'main') {
        setSetlistIds((prev) => prev.filter((i) => i !== activeId));
        setWorkspaceIds((prev) => [...prev, activeId]);
      } else {
        setWorkspaceIds((prev) => prev.filter((i) => i !== activeId));
        setSetlistIds((prev) => [...prev, activeId]);
      }
    }
  };
};
