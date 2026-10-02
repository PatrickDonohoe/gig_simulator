import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import CreateSetlistPage from '@/features/create_setlist/CreateSetlistPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';
import ReviewSetlistsPage from '@/features/review_setlists/ReviewSetlistsPage';
import SongsLibraryPage from '@/features/songs_library/SongsLibraryPage';
import { SongFormRoutes } from '@/routes/SongFormRoutes';

export const DashRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="create" replace /> },
  {
    path: 'create',
    element: <CreateSetlistPage />,
    children: SongFormRoutes,
  },
  { path: 'analytics', element: <AnalyticsPage /> },
  { path: 'review', element: <ReviewSetlistsPage /> },
  {
    path: 'library',
    element: <SongsLibraryPage />,
    children: SongFormRoutes,
  },
];
