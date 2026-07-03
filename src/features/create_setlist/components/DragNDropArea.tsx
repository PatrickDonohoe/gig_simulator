import {
  DragDropProvider,
  KeyboardSensor,
  PointerSensor,
} from '@dnd-kit/react';
import { useState } from 'react';

import WorkspaceSidebar from './WorkspaceSidebar';
import Setlist from './Setlist';

/** Section that contains the draggable and droppable areas */

const DragNDropArea = () => {
  const [isDropped, setIsDropped] = useState<boolean>(false);

  return (
    <DragDropProvider
      sensors={[PointerSensor, KeyboardSensor]}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { target } = event.operation;
        setIsDropped(target?.id === 'droppable');
      }}
    >
      <div id="drag_drop_area">
        <WorkspaceSidebar freeSongIds={[]} />
        <Setlist />
      </div>
    </DragDropProvider>
  );
};
export default DragNDropArea;
