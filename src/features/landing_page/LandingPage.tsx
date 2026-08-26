import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div>
      <h1>LandingPage</h1>
      <Link id='to-dash' to="dash">Dash</Link>{' '}
    </div>
  );
};
export default LandingPage;
