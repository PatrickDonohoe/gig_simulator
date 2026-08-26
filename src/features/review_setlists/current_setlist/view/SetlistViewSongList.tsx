import type { SetlistTileType } from '@/types/SetlistTileType';
import FilterAttribute from '@/features/create_setlist/components/FilterAttribute';
import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import useFilters from '@/hooks/useFilters';
import SetlistViewModeHeader, { type ViewModeHeaderProps } from '@/features/review_setlists/current_setlist/view/SetlistViewModeHeader';

export interface SetlistViewSongListProps {
  songsDisplayData: SetlistTileType[];
  viewHeader: ViewModeHeaderProps;
}

const SetlistViewSongList = ({
  songsDisplayData,
  viewHeader,
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
    <div>
      <SetlistViewModeHeader {...viewHeader} />
      
      {songsDisplayData.map((song, index) => (
        <div
          key={song.id}
          data-cy="tile"
          className="flex max-h-96 flex-col gap-4 overflow-hidden rounded-xl border-2 border-border-bold bg-accent p-2 text-text-main hover:border-border-subtle"
        >
          <div className="grid w-full grid-flow-col grid-cols-3">
            <h1 className="bg-wild_strawberry/20 col-start-2 justify-self-center rounded-xl p-2 text-2xl font-semibold text-bg-main underline">
              Song #{index + 1}
            </h1>
          </div>

          <article
            id="setlist_article"
            data-cy="article"
            className="flex flex-col justify-center gap-2 overflow-hidden rounded-xl border border-dark_amethyst bg-menu p-4 lg:gap-4"
          >
            <h2 className="text-center font-semibold">Title: {song.title}</h2>

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
                    data={formatters[f](song)}
                  />
                ))}
              </div>
            )}
          </article>

          <div className="flex flex-col gap-2">
            <p className="rounded-xl border-2 border-border-bold bg-bg-main p-2 focus:border-border-bold">
              {song.notes || 'Click the edit button to add notes.'}
            </p>

            <span className="text-text-main">
              {song.transitionTime.minutes || '00'}:{' '}
              {song.transitionTime.seconds || '00'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SetlistViewSongList;
