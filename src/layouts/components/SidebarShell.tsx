import SidebarHeader, {
  type SideHeaderProps,
} from '@/features/create_setlist/components/sidebar/SidebarHeader';

interface SideShellProps {
  HeaderProps: SideHeaderProps;
  children: React.ReactNode;
  className: string;
}

const SidebarShell = ({ HeaderProps, children, className }: SideShellProps) => {
  return (
    <aside
      id="sidebar"
      className={`flex min-h-0 flex-2 flex-col gap-4 border-r-2 ${className} p-4`}
    >
      <SidebarHeader {...HeaderProps} />

      {children}
    </aside>
  );
};
export default SidebarShell;
