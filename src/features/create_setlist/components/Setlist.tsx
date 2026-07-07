import { useDroppable } from '@dnd-kit/react';

import SetlistTile from './SetlistTile/SetlistTile';
import type { SetlistTileType } from '@/types/SetlistTileType';
import type { UseFormRegister } from 'react-hook-form';
import type { SubmitSetlistType } from '../types/SubmitSetlistType';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition
 * times.
 */

export interface SetlistProps {
  setlistList: SubmitSetlistType;
  register: UseFormRegister<SubmitSetlistType[]>;
  getSongDisplayDetails: (songId: string) => SetlistTileType[];
}

const Setlist = ({}: SetlistProps) => {
  const { ref, isDropTarget } = useDroppable({ id: 'setlist'});
  return (
    <section id="setlist" ref={ref} className={`flex flex-col gap-2`}>
      <h1>New Setlist</h1>

      <ul className="flex flex-col gap-4 lg:gap-6"></ul>
    </section>
  );
};
export default Setlist;
