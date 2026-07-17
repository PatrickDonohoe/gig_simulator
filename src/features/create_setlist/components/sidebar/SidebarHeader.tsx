import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';

const SidebarHeader = ({
  onClick,
}: {
  onClick: CommonTileProps['onClick'];
}) => {
  return (
    <header id="work_sidebar_headers" className="flex flex-col font-semibold">
      <div className="flex flex-col items-center justify-between bg-golden_apricot p-2 lg:flex-row">
        <h1 data-cy="h1" className="text-xl">
          Workspace
        </h1>

        <button
          onClick={onClick}
          className="flex-none rounded-xl border bg-muted_teal px-2 py-1 text-sm"
        >
          Add a song to your library
        </button>
      </div>
      <h2 data-cy="h2" className="bg-muted_teal p-2">
        Choose a song, and drag it to your setlist.
      </h2>
    </header>
  );
};
export default SidebarHeader;
