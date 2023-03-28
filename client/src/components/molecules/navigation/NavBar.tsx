import NavLink from '@components/atoms/navigation/NavLink';

const NavBar = () => {
  return (
    <nav>
      <ul className='flex gap-4 '>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLink text='About ' to='/about' />
        </li>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLink text='How to Play' to='/howtoplay' />
        </li>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLink text='Play' to='/game' />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
