import type { SongType } from '@/types/SongType';
import { timeBreakdown } from '@/utils/add_time/addTimeDurations';
import useFilters from '@/hooks/useFilters';
import FilterAttribute from '@/features/create_setlist/components/FilterAttribute';


const SongDetails = ({ song }: { song: SongType }) => {
  const { activeFilters } = useFilters();
  const formatters: Record<keyof SongType, (s: SongType) => string> = {
    id: (s) => s.id,
    rbid: (s) => s.rbid ?? '',
    title: (s) => s.title,
    artists: (s) => s.artists,
    key: (s) => `${s.key} ${s.mode}`,
    mode: (s) => s.mode,
    tempo: (s) => String(s.tempo),
    duration: (s) => {
      const { hours, minutes, seconds } = timeBreakdown(s.duration);
      return hours && hours > 0
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
    },
    upc: (s) => s.upc ?? '',
  };

  return (
    <article
      data-cy={`setlist-article-${song.id}`}
      className="flex flex-col justify-center gap-2 overflow-hidden rounded-xl border border-text-main bg-menu p-4 lg:gap-4"
    >
      <h2
        data-cy="song-title"
        className="text-center font-semibold"
      >
        Title: {song.title}
      </h2>

      {activeFilters.length > 0 && (
        <div data-cy="att_container" className="flex flex-wrap gap-6">
          {activeFilters.map((f) => (
            <FilterAttribute key={f} label={f} data={formatters[f](song)} />
          ))}
        </div>
      )}
    </article>
  );
};
export default SongDetails;
