import { Link } from 'react-router';

const RouteNotFoundFallback = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The route you are trying to visit does not exist.</p>
      <Link to="/">Return to the home page.</Link>
    </div>
  );
};
export default RouteNotFoundFallback;
