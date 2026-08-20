import SidebarHeader, {
  type SideHeaderProps,
} from '@/layouts/components/SidebarHeader';

interface SideShellProps {
  headerProps: SideHeaderProps;
  children: React.ReactNode;
  className: string;
}

const SidebarShell = ({ headerProps, children, className }: SideShellProps) => {
  return (
    <aside
      id="sidebar"
      className={`flex min-h-0 flex-2 flex-col gap-4 ${className} pr-4`}
    >
      <SidebarHeader {...headerProps} />

      {children}
    </aside>
  );
};
export default SidebarShell;
