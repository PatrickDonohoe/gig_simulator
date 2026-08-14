import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import CreateSetlistPage from '@/features/create_setlist/CreateSetlistPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';
import ReviewSetlistsPage from '@/features/review_setlists/ReviewSetlistsPage';

export const DashRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="create" replace /> },
  { path: 'create', element: <CreateSetlistPage /> },
  { path: 'analytics', element: <AnalyticsPage /> },
  { path: 'review', element: <ReviewSetlistsPage /> },
];
