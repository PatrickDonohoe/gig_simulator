import type { RouteObject } from "react-router-dom";

import { CreateSetlistPage } from "@/features/create_setlist";

export const DashRoutes: RouteObject[] = [
  { index: true, element: <CreateSetlistPage /> }, // TODO: remove stub when page is complete
];