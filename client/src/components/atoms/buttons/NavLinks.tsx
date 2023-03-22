import React from 'react';
import { Link } from 'react-router-dom';

interface INavLinks_Props {
  to: string;
  text: string;
}

const NavLinks = ({ text, to }: INavLinks_Props) => {
  return (
    <Link
      to={to}
      className='duration-200 text-sm font-body text-slate-500 tracking-wide hover:bg-indigo-50 rounded-lg py-2 px-4 hover:text-indigo-500 '
    >
      {text}
    </Link>
  );
};

export default NavLinks;
