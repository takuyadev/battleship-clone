import { TbShip } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import NavBar from '@components/molecules/navigation/NavBar';

const Header = () => {
  return (
    <header className='flex justify-between w-full border-b-2 border-slate-100 p-4'>
      <Link className='flex gap-2 items-center bg-white text-slate-700' to='/'>
        <TbShip />
        <p className='font-display text-lg font-bold'>Battleship</p>
      </Link>
      <NavBar />
    </header>
  );
};

export default Header;
