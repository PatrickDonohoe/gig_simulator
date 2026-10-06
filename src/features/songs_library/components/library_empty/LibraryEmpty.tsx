import { Link } from 'react-router';

const LibraryEmpty = () => {
  return (
    <div id="library-empty" className="text-text-main flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold">
        There are no songs in your library yet. Click the button below to add
        your first one.
      </h3>

      <Link to="add-song" id="add-song" className="bg-bg-main/80 hover:bg-bg-surface border-2 border-text-text-main rounded-md py-1 px-2 hover:shadow-lg">
        Add Song
      </Link>
    </div>
  );
};
export default LibraryEmpty;
