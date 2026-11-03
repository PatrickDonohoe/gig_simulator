import { Link } from 'react-router';

const LibraryEmpty = () => {
  return (
    <div
      id="library-empty"
      className="flex flex-col items-center gap-4 text-text-main"
    >
      <h3 className="text-lg font-semibold">
        There are no songs in your library yet. Click the button below to add
        your first one.
      </h3>

      <Link
        to="add-song"
        id="add-song"
        className="border-text-text-main rounded-md border-2 bg-bg-main/80 px-2 py-1 hover:bg-bg-surface hover:shadow-lg"
      >
        Add Song
      </Link>
    </div>
  );
};
export default LibraryEmpty;
