import type { SearchResultsProps } from '@/types/SearchResultsProps';
import { formatDuration } from '@/utils/add_time/addTimeDurations';

const ResultsTable = ({
  results,
  isFetching,
  isPlaceholderData,
  onSelect,
  onPageChange,
}: SearchResultsProps) => {
  return (
    <div
      id="results-table"
      className={`${isPlaceholderData ? 'opacity-60' : ''}`}
    >
      <table id="results-table">
        <caption className="text-3xl font-bold">Search Results</caption>

        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Length</th>
            <th></th>
          </tr>
        </thead>

        <tbody
          className={`${isFetching ? 'opacity-60' : ''} border-2 border-text-main`}
        >
          {results.rows.map((song) => (
            <tr
              key={song.id}
              className="divide-x-2 divide-text-main odd:bg-bg-main even:bg-bg-main/80"
            >
              <td>{song.title}</td>
              <td>
                {song.artists}
                {song.artists.length > 1 ? ' et al.' : ''}
              </td>
              <td>{formatDuration(song.durationSec)}</td>
              <td>
                <button
                  id={`select-${song.id}`}
                  onClick={() => onSelect(song.id)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <caption className="caption-bottom">
          <span>
            Page {results.page + 1} of {results.totalPages + 1}
          </span>
          <div className="block border border-text-muted divide divide-text-muted *:inset-shadow-sm">
            <button
              disabled={results.page === 0 || isFetching}
              onClick={() => onPageChange(results.page - 1)}
            >
              &lsaquo;
            </button>
            <button>{results.page + 1}</button>
            <button
              disabled={
                results.page === results.totalPages || isFetching
              }
              onClick={() => onPageChange(results.page + 1)}
            >
              &rsaquo;
            </button>
          </div>
        </caption>
      </table>
    </div>
  );
};
export default ResultsTable;
