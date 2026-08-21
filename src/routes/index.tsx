import { createBrowserRouter } from 'react-router';

import PageLayout from '@/layouts/PageLayout';
import { DashRoutes } from './dashRoutes';
import RouteErrorBoundary from './RouteErrorBoundary';
import LandingPage from '@/features/landing_page/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dash',
    element: <PageLayout />,
    errorElement: <RouteErrorBoundary />,
    children: DashRoutes,
  },
]);
