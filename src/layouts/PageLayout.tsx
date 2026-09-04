import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeProvider from '@/context/theme/ThemeProvider';
import HeaderLayout from '@/layouts/components/HeaderLayout';

/** Controls layout only for general page view. */

const PageLayout = () => {
  return (
    <ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        toastClassName="p-0! bg-transparent! shadow-none! min-h-0"
      />

      <div
        id="page_layout"
        className="flex h-screen flex-col overflow-x-auto bg-bg-main"
      >
        <HeaderLayout />
        
        <div className="flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PageLayout;
