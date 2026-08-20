import type { FieldArrayWithId } from 'react-hook-form';

import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import type { CommonTileProps } from '../../features/create_setlist/types/CommonTileProps';
import SetlistHeader from '@/components/setlist/SetlistHeader';
import SetlistShell from '@/layouts/components/SetlistShell';
import SetlistSongList from '@/components/setlist/SetlistSongList';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 */

export interface SetlistProps {
  tiles: FieldArrayWithId<FormValues, 'setlist'>[];
  commonTileProps: CommonTileProps; // submit function passed also;
  setlistDuration: number;
}

const Setlist = ({ tiles, commonTileProps, setlistDuration }: SetlistProps) => {
  
  const { register, onClick, ...rest } = commonTileProps;

  return (
    <SetlistShell>
      {/* TODO: Come back to add HeaderFilters */}
      <SetlistHeader {...rest} setlistDuration={setlistDuration}>
        <input
          data-cy="title"
          type="text"
          className="grow rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName')}
        />
        <button
          data-cy="submit"
          type="submit"
          className="flex flex-3 flex-row items-center justify-center gap-2 rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent lg:text-lg"
          onClick={onClick}
        >
          <span>+</span> <span>Save Setlist</span>
        </button>
      </SetlistHeader>

      <SetlistSongList tiles={tiles} commonTileProps={commonTileProps} />
    </SetlistShell>
  );
};
export default Setlist;
