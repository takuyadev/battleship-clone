import { Outlet } from 'react-router-dom';
import Header from '@components/organisms/_general/Header';
import Footer from '@components/organisms/_general/Footer';
import Wave from 'react-wavify';

function App(): JSX.Element {
  return (
    <div className='flex flex-col gap-4'>
      <Header />
      <main className='z-10 pb-24 mx-8'>
        <Outlet />
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
