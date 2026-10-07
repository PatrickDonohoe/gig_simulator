import { Link, useLocation } from 'react-router';

import type { SearchResultsProps } from '@/types/SearchResultsProps';
import { secToDisplay } from '@/utils/add_time/addTimeDurations';
import PageButton from '@/components/search_results/PageButton';

const ResultsTable = ({
  results,
  isFetching,
  isPlaceholderData,
  onPageChange,
}: SearchResultsProps) => {
  const { search } = useLocation();

  return (
    <div
      id="results-table-component"
      className={`${isPlaceholderData ? 'opacity-60' : ''} flex flex-col gap-4`}
    >
      <table id="results-table" className="w-full">
        <caption className="pb-4 text-3xl font-bold">Search Results</caption>

        <thead>
          <tr>
            <th className="pb-2 pl-2 text-left">Title</th>
            <th className="pb-2 pl-2 text-left">Artist</th>
            <th className="pb-2 pl-2 text-left">Length</th>
            <th></th>
          </tr>
        </thead>

        <tbody
          className={`${isFetching ? 'transition-opacity-60' : ''} border-2 border-text-main`}
        >
          {results.rows.map((song) => (
            <tr
              key={song.id}
              className="divide-x-2 divide-text-main bg-bg-main even:bg-bg-surface"
            >
              <td id={`${song.id}-title`} className="px-2">{song.title}</td>
              <td id={`${song.id}-artists`} className="px-2">
                {/* Show the first artist in the array, if there is one. */}
                {song.artists.length > 0 ? song.artists[0].name : 'Unavailable'}
                {/* If there is more than one, indicate there are multiple. */}
                {/* TODO: Solve at a later date how to show the rest of the artists. */}
                {song.artists.length > 1 ? ', et al.' : ''}
              </td>
              <td id={`${song.id}-durationSec`} className="min-w-20 px-2 text-center">
                {secToDisplay(song.durationSec)}
              </td>
              <td id={`${song.id}-select`} className="px-2 py-1 text-center">
                <Link
                  to={`track/${song.id}`}
                  state={{ fromSearch: search }}
                  id={`select-${song.id}`}
                  className="rounded-md border border-text-main bg-bg-main px-1 text-text-main transition-colors hover:bg-accent dark:hover:text-black"
                >
                  Select
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TODO: return to add jump to first and last page buttons */}
      <div className="flex items-center justify-center gap-4">
        <span>
          Page {results.page + 1} of {results.totalPages}
        </span>

        <div className="flex items-center justify-center gap-4">
          <PageButton
            isDisabled={results.page === 0 || isFetching}
            onClick={() => onPageChange(results.page - 1)}
            direction="prev"
          />

          <span className="px-2">{results.page + 1}</span>

          <PageButton
            isDisabled={results.page >= results.totalPages - 1 || isFetching}
            onClick={() => onPageChange(results.page + 1)}
            direction="next"
          />
        </div>
      </div>
    </div>
  );
};
export default ResultsTable;
