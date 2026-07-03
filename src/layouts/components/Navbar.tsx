import NavbarLink from './NavbarLink';

import CreateIcon from '@icons/playlist-add-svgrepo-com.svg';
import ReviewIcon from '@icons/playlist-2-svgrepo-com.svg';
import AnalyticsIcon from '@icons/analytics-graph-chart-svgrepo-com.svg';

const Navbar = () => {
  return (
    <nav id="navbar" className="flex h-16 items-center gap-4 border-b-2 px-4">
      <NavbarLink
        address="/dash/create"
        label="Create Setlist"
        icon={CreateIcon}
      />

      <NavbarLink
        address="/dash/review"
        label="Review Setlists"
        icon={ReviewIcon}
      />

      <NavbarLink address="/analytics" label="Analytics" icon={AnalyticsIcon} />
    </nav>
  );
};
export default Navbar;
