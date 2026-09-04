import FilterAttribute from '@/features/create_setlist/components/FilterAttribute';
import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import useFilters from '@/hooks/useFilters';
import SetlistViewModeHeader, {
  type ViewModeHeaderProps,
} from '@/features/review_setlists/current_setlist/view/SetlistViewModeHeader';
import type { SubmitSetlistType } from '@/features/create_setlist/types/SubmitSetlistType';
import Between from '@icons/spacing-vertical-svgrepo-com.svg?react';

export interface SetlistViewSongListProps {
  setlistSongs: SubmitSetlistType['setlistSongs'];
  viewHeader: ViewModeHeaderProps;
  getSongData: (songId: string) => SongType | undefined;
}

/**
 * @param setlistSongs Is an array of the song id's and transition data for the
 *   selected setlist.
 * @param viewHeader Is the setlist data needed for the header and the callback
 *   fn to change the mode.
 * @param getSongData Is the callback fn to retrieve song data for a specific
 *   tile.
 * @returns A header (including setlist name and filters) and the mapped songs
 *   and transitions specific to this setlist.
 * @summary Presents the body of the setlist.
 */
const SetlistViewSongList = ({
  setlistSongs,
  viewHeader,
  getSongData,
}: SetlistViewSongListProps) => {
  const formatters: Record<keyof SongType, (s: SongType) => string> = {
    id: (s) => s.id,
    title: (s) => s.title,
    artist: (s) => s.artist,
    genre: (s) => s.genre,
    key: (s) => s.key,
    tempo: (s) => s.tempo,
    duration: (s) => {
      const { hours, minutes, seconds } = timeBreakdown(s.duration);
      return hours && hours > 0
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
    },
    instrumentation: (s) => s.instrumentation.join(', '),
  };

  const { activeFilters } = useFilters();

  return (
    <div
      id="setlist-view-song-list"
      className="flex min-h-0 flex-1 flex-col divide-y-2 divide-border-bold"
    >
      <SetlistViewModeHeader {...viewHeader} />

      <div
        data-cy="list"
        className="flex min-h-0 flex-1 flex-col items-center gap-4 overflow-hidden bg-accent p-2 text-text-main hover:border-border-subtle"
      >
        {setlistSongs.map((item, index) => {
          if (item.kind !== 'song') {
            return (
              // Transition Tile
              <article
                key={item.transitionId}
                className="flex items-center gap-6"
              >
                <Between className="size-8" />

                <div className="flex flex-col gap-2 border-2 border-border-bold bg-bg-main p-2">
                  <p data-cy={`song-notes-${index}`}>
                    {item.notes ? (
                      <>
                        <strong>Notes: </strong> <span>{item.notes}</span>
                      </>
                    ) : (
                      'Click the edit button to add notes.'
                    )}
                  </p>
                  <span
                    data-cy="song-transition"
                    className="text-center text-text-main"
                  >
                    <strong>Transition Time:</strong> {'  '}
                    {item.transitionTime.minutes ?? '00'}:
                    {item.transitionTime.seconds ?? '00'}
                  </span>
                </div>
              </article>
            );
          }

          const song = getSongData(item.songId);

          return (
            <article
              key={item.songId}
              id="setlist-article"
              data-cy="article"
              className="flex w-1/2 max-w-75 flex-col justify-center gap-2 overflow-hidden rounded-xl border border-dark_amethyst bg-menu p-4 lg:gap-4"
            >
              <h2 id="song-title" className="text-center font-semibold">
                Title: {song?.title ?? 'Unavailable'}
              </h2>

              {/* The title filter/data is provided above. If filters other than the title are present, show them here. Otherwise, render nothing so that the title is centered vertically. */}
              {activeFilters.length > 0 && (
                <div
                  id="attributes_container"
                  data-cy="att_container"
                  className="flex flex-wrap gap-2"
                >
                  {activeFilters.map((f) => (
                    <FilterAttribute
                      key={f}
                      label={f}
                      data={song ? formatters[f](song) : 'Unavailable'}
                    />
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
export default SetlistViewSongList;
