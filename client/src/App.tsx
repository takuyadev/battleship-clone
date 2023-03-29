import { Outlet } from 'react-router-dom';
import { AnimatePresence} from 'framer-motion';
import Header from '@components/organisms/_general/Header';
import Footer from '@components/organisms/_general/Footer';
import Wave from 'react-wavify';

function App(): JSX.Element {
  return (
    <div className='flex flex-col gap-4 overflow-x-hidden'>
      <Header />
      <main className='flex justify-center align-center z-10 pb-24 mx-8'>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
      <Wave
        stroke='#eef2ff'
        className='absolute bottom-0  z-0 w-screen h-1/2'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
    </div>
  );
}

export default App;
