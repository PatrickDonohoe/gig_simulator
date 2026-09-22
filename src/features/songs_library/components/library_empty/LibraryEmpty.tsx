interface LibraryEmptyProps {
  openAddSong: () => void;
}

const LibraryEmpty = ({ openAddSong }: LibraryEmptyProps) => {
  return (
    <div id="library-empty" className="text-text-main">
      <h3 className="text-lg font-semibold">
        There are no songs in your library yet. 
        Click the button below to add your first one.
      </h3>

      <button id="add-song" className="bg-bg-main/80" onClick={openAddSong}>Add Song</button>
    </div>
  )
}
export default LibraryEmpty