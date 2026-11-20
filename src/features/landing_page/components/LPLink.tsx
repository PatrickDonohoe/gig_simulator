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
      className="rounded-md bg-menu px-2 py-1 font-semibold hover:bg-accent w-full h-full text-sm sm:text-base inline-block align-middle text-center transition duration-200 ease-in-out"
    >
      {text}
    </Link>
  );
};
export default LPLink;
