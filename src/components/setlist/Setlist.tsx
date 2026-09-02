import type { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import SetlistHeader from '@/components/setlist/SetlistHeader';
import SetlistShell from '@/layouts/components/SetlistShell';
import SetlistSongList, {
  type SongListProps,
} from '@/components/setlist/SetlistSongList';
import HeaderFilters from '@/components/setlist/HeaderFilters';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 */

export interface SetlistProps extends SongListProps {
  tiles: SongListProps['tiles'];
  commonTileProps: SongListProps['commonTileProps'];
  setlistDuration: number;
  errors: FieldErrors<FormValues>;
  isValid: boolean;
}

const Setlist = ({
  tiles,
  commonTileProps,
  setlistDuration,
  errors,
  isValid,
  setlistInsert,
}: SetlistProps) => {
  const { register, ...rest } = commonTileProps;

  return (
    <SetlistShell>
      {/* TODO: Come back to add HeaderFilters */}
      <SetlistHeader {...rest} setlistDuration={setlistDuration}>
        <input
          data-cy="title"
          type="text"
          className="grow rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted lg:col-start-2"
          placeholder="New Setlist #1"
          {...register('setlistName', {
            required: 'A setlist name is required.',
          })}
        />

        <ErrorMessage as='span' data-cy="error" name="setlistName" errors={errors} />

        <button
          data-cy="submit"
          type="submit"
          className="flex flex-3 flex-row items-center justify-center gap-2 rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent lg:text-lg"
          disabled={!isValid}
        >
          <span>+</span> <span>Save Setlist</span>
        </button>
      </SetlistHeader>

      <HeaderFilters />

      <SetlistSongList
        tiles={tiles}
        commonTileProps={commonTileProps}
        setlistInsert={setlistInsert}
      />
    </SetlistShell>
  );
};
export default Setlist;
