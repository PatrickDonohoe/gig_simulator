import { useRouteError, isRouteErrorResponse, Link, useNavigate } from 'react-router';

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const canGoBack = (window.history.state?.idx ?? 0) > 0;

  const goBack = () => (canGoBack ? navigate(-1) : navigate('/'));

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
        <button type='button' onClick={goBack}></button>
        <Link to="/">Return Home</Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
        <button type='button' onClick={goBack}></button>
        <Link to="/">Return Home</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unknown Error</h1>
        <button type='button' onClick={goBack}></button>
        <Link to="/">Return Home</Link>
      </div>
    );
  }
};
export default RouteErrorBoundary;
