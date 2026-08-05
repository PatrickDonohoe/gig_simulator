import { NavLink } from 'react-router-dom';

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
        `${isActive ? 'bg-primary text-white' : 'bg-bg-main text-text-main'} flex hover:bg-border-subtle justify-between items-center px-2 py-1 gap-2`
      }
    >
      <div className="size-8 flex justify-center items-center">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};
export default NavbarLink;
