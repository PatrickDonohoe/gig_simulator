import SidebarHeader, {
  type SideHeaderProps,
  type SidebarVariant,
} from '@/layouts/components/SidebarHeader';

interface SideShellProps {
  headerProps: SideHeaderProps;
  children: React.ReactNode;
  variant?: SidebarVariant;
  className?: string;
  dataCy?: string; // unique per sidebar, since several can render on one page
}

/**
 * Shared skeleton for every sidebar: header row (title + action), subtitle,
 * then a scrolling list. The variant only changes styling, never layout.
 *
 * - `nav`: quiet, page-coloured, narrow. For choosing what to view (setlists).
 * - `panel`: raised card with the brand-coloured header. For tools that feed the
 *   editor (song library), so it sits flush against the setlist.
 */
const variantStyles: Record<SidebarVariant, { aside: string; card: string }> = {
  nav: {
    aside: 'w-40 flex-none mr-4 lg:w-56',
    card: 'border-r-2 border-border-bold bg-bg-main',
  },
  panel: {
    aside: 'max-w-80 grow mr-2',
    card: 'mb-2 border border-border-bold bg-menu shadow-md',
  },
};

const SidebarShell = ({
  headerProps,
  children,
  variant = 'panel',
  className = '',
  dataCy = 'library-sidebar',
}: SideShellProps) => {
  const styles = variantStyles[variant];

  return (
    <aside
      id="sidebar"
      className={`flex min-h-0 flex-col ${styles.aside} ${className}`}
    >
      <section
        data-cy={dataCy}
        className={`flex min-h-0 flex-1 flex-col overflow-hidden ${styles.card}`}
      >
        <SidebarHeader {...headerProps} variant={variant} />

        {/* Mapped tiles and drag ref */}
        {children}
      </section>
    </aside>
  );
};
export default SidebarShell;
