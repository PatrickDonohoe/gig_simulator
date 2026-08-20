// This component is positioned at the top of the aside and contains the sidebar title and button.

export interface SideHeaderProps {
  onClick: () => void;
  header: string;
  buttonText: string;
  header2: string;
}

const SidebarHeader = ({
  onClick,
  header,
  buttonText,
  header2,
}: SideHeaderProps) => {
  return (
    <header
      id="work_sidebar_headers"
      className="flex flex-col overflow-hidden border border-border-bold bg-primary font-semibold text-text-main"
    >
      <div className="flex flex-col items-center justify-between overflow-hidden border-b border-border-bold p-2 lg:flex-row">
        <h1 data-cy="h1" className="text-xl text-accent">
          {header}
        </h1>

        <button
          onClick={onClick}
          className="flex-none rounded-xl border bg-bg-main px-2 py-1 text-sm hover:bg-bg-surface hover:text-text-muted"
        >
          {buttonText}
        </button>
      </div>
      <h2 data-cy="h2" className="bg-menu p-2">
        {header2}
      </h2>
    </header>
  );
};
export default SidebarHeader;
