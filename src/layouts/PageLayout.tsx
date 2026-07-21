import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

/** Controls layout only for general page view. */

const PageLayout = () => {
  return (
    <div id="page_layout" className="flex h-screen flex-col">
      <Navbar />

      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
