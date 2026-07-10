import NavbarLink from './NavbarLink';
import { paths } from '@/routes/paths';

import CreateIcon from '@icons/playlist-add-svgrepo-com.svg?react';
import ReviewIcon from '@icons/playlist-2-svgrepo-com.svg?react';
import AnalyticsIcon from '@icons/analytics-graph-chart-svgrepo-com.svg?react';

const Navbar = () => {
  return (
    <nav id="navbar" className="flex h-16 items-center gap-4 border-b-2 px-4">
      <NavbarLink
        address={paths.createSetlist}
        label="Create Setlist"
        icon={<CreateIcon />}
      />

      <NavbarLink
        address={paths.reviewSetlists}
        label="Review Setlists"
        icon={<ReviewIcon />}
      />

      <NavbarLink
        address={paths.analytics}
        label="Analytics"
        icon={<AnalyticsIcon />}
      />
    </nav>
  );
};
export default Navbar;
