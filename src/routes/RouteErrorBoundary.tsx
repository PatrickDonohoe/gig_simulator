import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

import RouteNotFoundFallback from './RouteNotFoundFallback';

const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <RouteNotFoundFallback />;
    }
  }

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      <Link to="/">Return Home</Link>
    </div>
  );
};
export default RouteErrorBoundary;
