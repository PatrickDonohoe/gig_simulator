import { Link } from 'react-router';

// This component is positioned at the top of the aside and contains the sidebar title and button.

export type SidebarVariant = 'nav' | 'panel';

export interface SideHeaderProps {
  header: string;
  buttonText: string;
  header2: string;
  address: string;
}

interface SidebarHeaderProps extends SideHeaderProps {
  variant?: SidebarVariant;
}

// Layout classes are shared; only colour and weight differ between variants.
const variantStyles: Record<
  SidebarVariant,
  { titleRow: string; title: string; subtitle: string }
> = {
  nav: {
    titleRow: 'bg-bg-main',
    title: 'text-text-main',
    subtitle: 'font-normal text-text-muted',
  },
  panel: {
    titleRow: 'bg-primary',
    title: 'text-accent',
    subtitle: 'bg-menu',
  },
};

const SidebarHeader = ({
  header,
  buttonText,
  header2,
  address,
  variant = 'panel',
}: SidebarHeaderProps) => {
  const styles = variantStyles[variant];

  return (
    <header
      id="work_sidebar_headers"
      className="flex flex-none flex-col overflow-hidden border-b border-border-bold font-semibold text-text-main"
    >
      <div
        className={`flex flex-col items-center justify-between gap-2 p-2 lg:flex-row ${styles.titleRow}`}
      >
        <h1 data-cy="h1" className={`text-xl ${styles.title}`}>
          {header}
        </h1>

        <Link
          id="sidebar-header-button"
          to={address}
          className="flex-none rounded-xl border bg-bg-main px-2 py-1 text-sm whitespace-nowrap hover:bg-bg-surface hover:text-text-muted"
        >
          {buttonText}
        </Link>
      </div>

      <h2 data-cy="h2" className={`p-2 text-center ${styles.subtitle}`}>
        {header2}
      </h2>
    </header>
  );
};
export default SidebarHeader;
