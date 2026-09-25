import { Link } from 'react-router';

interface LPLinkProps {
  id: string;
  address: string;
  text: string;
}

const LPLink = ({ id, address, text }: LPLinkProps) => {
  return (
    <Link
      id={id}
      to={address}
      className="rounded-md bg-menu px-2 py-1 font-semibold hover:bg-accent"
    >
      {text}
    </Link>
  );
};
export default LPLink;
