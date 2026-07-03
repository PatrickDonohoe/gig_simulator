import { createBrowserRouter } from 'react-router-dom';

import PageLayout from '@/layouts/PageLayout';
import { dashRoutes } from './dashRoutes';

export const router = createBrowserRouter([
  {
    path: '/dash',
    element: <PageLayout />,
    children: dashRoutes,
  },
]);
