import type { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import type { FormValues } from '../../hooks/use_setlist/useSetlist';
import SetlistHeader from '@/components/setlist/SetlistHeader';
import SetlistShell from '@/layouts/components/SetlistShell';
import SetlistSongList, {
  type SongListProps,
} from '@/components/setlist/SetlistSongList';
import HeaderFilters from '@/components/filters/HeaderFilters';

/**
 * Area where dropped song tiles go. Tiles will be separated by transition times
 * and notes.
 *
 * The interface here destructures the passed {...setlist}.
 */

export interface SetlistProps extends SongListProps {
  tiles: SongListProps['tiles'];
  commonTileProps: SongListProps['commonTileProps'];
  setlistDuration: number;
  errors: FieldErrors<FormValues>;
  isDirty: boolean;
}

const Setlist = ({
  tiles,
  commonTileProps,
  setlistDuration,
  errors,
  isDirty,
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
          className="grow order-3 @md:order-2 @md:basis-0 @md:min-w-24 rounded-xl border border-border-bold bg-bg-main p-2 text-text-main placeholder:text-text-muted"
          placeholder="New Setlist #1"
          {...register('setlistName', {
            required: 'A setlist name is required.',
          })}
        />

        <button
          data-cy="submit"
          type="submit"
          className="flex flex-row items-center justify-center order-2 @md:order-3 gap-2 rounded-lg border border-border-bold bg-primary p-1 font-semibold text-accent lg:text-lg max-w-40"
          disabled={!isDirty}
        >
          <span>+</span> <span>Save</span> <span className=''>Setlist</span>
        </button>
      </SetlistHeader>

      <ErrorMessage
        as="span"
        data-cy="error"
        name="setlistName"
        errors={errors}
      />

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
