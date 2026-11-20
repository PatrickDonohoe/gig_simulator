import { Link } from 'react-router';

import Logo from '@icons/Logo_Only.svg?react';

const Branding = () => {
  return (
    <Link to="/" id="branding" className="flex items-center gap-3 py-2">
      <Logo className="size-12 md:size-16" />

      <div
        id="company-name"
        className="hidden flex-col justify-center font-semibold sm:flex"
      >
        <span className="text-2xl text-text-main">SETLIST</span>

        <span className="text-xl text-accent">BUILDER</span>
      </div>
    </Link>
  );
};
export default Branding;
