import { Outlet } from 'react-router-dom';

import ThemeProvider from '@/context/ThemeProvider';
import HeaderLayout from '@/layouts/components/HeaderLayout';

/** Controls layout only for general page view. */

const PageLayout = () => {
  return (
    <ThemeProvider>
      <div id="page_layout" className="flex h-screen flex-col bg-bg-main overflow-x-auto">
        <HeaderLayout />
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PageLayout;
