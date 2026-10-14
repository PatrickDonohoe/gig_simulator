import { Link } from 'react-router';

/**
 * @param searchText Is the song title searched
 * @returns A message about no results being found and a link to start a create
 *   your own song journey.
 */

const NoResults = ({ searchText }: { searchText: string }) => {
  return (
    <div id="no-results" className="flex flex-col items-center gap-4">
      <p>No songs found for "{searchText}". Click below to create your own.</p>

      <Link
        to={`new/${searchText}`}
        className="rounded-md border border-text-main bg-bg-main px-2 py-1 text-text-main transition-colors hover:bg-accent dark:hover:text-black"
      >
        Create a new song
      </Link>
    </div>
  );
};
export default NoResults;
