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
        `${isActive ? 'bg-dusk_blue text-white' : 'bg-white text-dark_amethyst'} flex hover:bg-muted_teal`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};
export default NavbarLink;
