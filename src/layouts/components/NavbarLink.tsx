import { NavLink } from 'react-router';

export interface NavLinkProps {
  address: string;
  label: string;
  icon: React.ReactNode;
}

const NavbarLink = ({ address, label, icon }: NavLinkProps) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `${isActive ? 'bg-primary text-white' : 'bg-bg-main text-text-main'} flex items-center justify-between gap-1 px-2 hover:bg-border-subtle`
      }
    >
      <div className="flex size-8 items-center justify-center">{icon}</div>

      <span className="text-sm md:flex-nowrap lg:text-base">{label}</span>
    </NavLink>
  );
};
export default NavbarLink;
