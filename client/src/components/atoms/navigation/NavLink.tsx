import { Link, LinkProps } from 'react-router-dom';

export interface NavLinkProps extends LinkProps {
  to: string;
  text: string;
  active?: boolean;
  className?: string;
}

const NavLink = ({ text, to, active = false, className }: NavLinkProps) => {
  // If active, then apply classes
  const activeClass = active && 'bg-indigo-500';

  return (
    <Link
      to={to}
      className={`${
        className && className
      } ${activeClass} duration-200 text-sm font-body text-slate-500 tracking-wide hover:bg-indigo-50 rounded-lg py-2 px-4 hover:text-indigo-500`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
