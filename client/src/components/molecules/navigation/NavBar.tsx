import NavLink from '@components/atoms/navigation/NavLink';

const NavBar = () => {
  return (
    <nav>
      <ul className='flex gap-4 '>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLink text='Leaderboard ' to='/leaderboard' />
        </li>
        <li className='font-body text-slate-500 tracking-wide test-sm'>
          <NavLink active text='Play' to='/' />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
