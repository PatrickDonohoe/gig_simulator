import SidebarShell from '@/layouts/components/SidebarShell';
import type { SideHeaderProps } from '@/layouts/components/SidebarHeader';

interface SavedSetlistsShellProps {
  headerProps: SideHeaderProps;
  children: React.ReactNode;
}

// Contains SidebarShell to keep the same proportions for all sidebars.
// Contains styling within that to keep the same appearance for the empty setlist list and the filled setlist list.
// Contains a children prop to allow direct injection of necessary differences.

const SavedSetlistsShell = ({
  headerProps,
  children,
}: SavedSetlistsShellProps) => {
  return (
    <SidebarShell headerProps={headerProps} className="border-border-bold">
      <section
        data-cy="sidebar-setlists-shell"
        className="flex min-h-0 flex-1 flex-col justify-start overflow-hidden border border-border-bold bg-primary"
      >
        <div className="flex items-center justify-center border-b-8 border-border-bold bg-bg-main py-2 text-2xl font-semibold text-text-main">
          <span>{headerProps.header}</span>
        </div>
        {children}
      </section>
    </SidebarShell>
  );
};
export default SavedSetlistsShell;
