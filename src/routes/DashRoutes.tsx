import type { RouteObject } from 'react-router';
import { Navigate } from 'react-router';

import CreateSetlistPage from '@/features/create_setlist/CreateSetlistPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';
import ReviewSetlistsPage from '@/features/review_setlists/ReviewSetlistsPage';
import SongsLibraryPage from '@/features/songs_library/SongsLibraryPage';
import { SongFormRoutes } from '@/routes/SongFormRoutes';
import { getSetlist } from '@/utils/setlist_storage/setlistStorage';
import SetlistReviewForm from '@/features/review_setlists/current_setlist/view/SetlistReviewForm';
import ReviewSetlistsIndex from '@/features/review_setlists/current_setlist/view/ReviewSetlistsIndex';
import SetlistPerformMode from '@/features/review_setlists/current_setlist/perform/SetlistPerformMode';

export const DashRoutes: RouteObject[] = [
  { index: true, element: <Navigate to="create" replace /> },
  {
    path: 'create',
    Component: CreateSetlistPage,
    children: SongFormRoutes,
  },
  { path: 'analytics', Component: AnalyticsPage },
  {
    path: 'review',
    Component: ReviewSetlistsPage,
    children: [
      { index: true, Component: ReviewSetlistsIndex },
      {
        id: 'setlist',
        path: ':setlistId',
        loader: ({ params }) => {
          const saved = getSetlist(params.setlistId!);
          if (!saved) throw new Response('Setlist not found', { status: 404 });
          return saved;
        },
        children: [
          {
            Component: SetlistReviewForm,
            children: [{ index: true }, ...SongFormRoutes],
          },
          { path: 'perform', Component: SetlistPerformMode },
        ],
      },
    ],
  },
  {
    path: 'library',
    Component: SongsLibraryPage,
    children: SongFormRoutes,
  },
];
