import SidebarHeader, {
  type SideHeaderProps,
} from '@/layouts/components/SidebarHeader';

interface SideShellProps {
  headerProps: SideHeaderProps;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SidebarShell = ({ headerProps, title, children, className }: SideShellProps) => {
  return (
    <aside
      id="sidebar"
      className={`flex min-h-0 max-w-80 grow flex-col gap-4 ${className} pr-4`}
    >
      <SidebarHeader {...headerProps} />

      <section
        data-cy="library-sidebar"
        className="mb-2 flex min-h-0 flex-1 flex-col overflow-hidden border border-border-bold bg-primary"
      >
        <div
          data-cy="wrapper_title"
          className="flex items-center justify-center border-b border-border-bold py-1"
        >
          <h2 className="text-xl font-semibold text-accent underline">
            {title}
          </h2>
        </div>

        {/* Mapped tiles and drag ref */}
        {children}
      </section>
      {/* {children} */}
    </aside>
  );
};
export default SidebarShell;
