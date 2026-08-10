import type { CommonTileProps } from '@/features/create_setlist/types/CommonTileProps';

const SidebarHeader = ({
  onClick,
}: {
  onClick: CommonTileProps['onClick'];
}) => {
  return (
    <header id="work_sidebar_headers" className="flex flex-col font-semibold text-text-main border border-border-bold rounded-xl overflow-hidden bg-primary">
      <div className="flex flex-col items-center justify-between p-2 lg:flex-row border-b border-border-bold overflow-hidden">
        <h1 data-cy="h1" className="text-xl">
          Workspace
        </h1>

        <button
          onClick={onClick}
          className="flex-none rounded-xl border bg-bg-main hover:bg-bg-surface px-2 py-1 text-sm hover:text-text-muted"
        >
          Add Song +
        </button>
      </div>
      <h2 data-cy="h2" className="rounded-b-xl bg-menu p-2">
        Choose a song, and drag it to your setlist.
      </h2>
    </header>
  );
};
export default SidebarHeader;
