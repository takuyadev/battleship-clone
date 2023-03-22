import EditBoard from '@components/organisms/app/EditBoard';
import { useBoard } from '@hooks/useBoard';
import { useShips } from '@hooks/useShips';
import { ROWS, COLUMNS } from '@data/constants';
import { Outlet } from 'react-router-dom';
import Header from '@components/organisms/_general/Header';
import Footer from '@components/organisms/_general/Footer';

function App(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
