import React from 'react';
import NavLinks from '@components/atoms/buttons/NavLinks';

const NavBar = () => {
  return (
    <nav>
      <ul className='flex gap-4 '>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLinks text='About ' to='/about' />
        </li>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLinks text='How to Play' to='/howtoplay' />
        </li>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLinks text='Play' to='/play' />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
