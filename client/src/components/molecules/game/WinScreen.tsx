import Popup from '@components/atoms/ui/Popup';
import Confetti from 'react-confetti';

interface WinScreenProps {
  children: React.ReactNode;
  username: string;
  isWin: boolean;
}

const WinScreen = ({ children, username, isWin }: WinScreenProps) => {
  return (
    <Popup
      isShow={isWin ? true : false}
      className='h-screen w-screen bg-black opacity-90 flex justify-center items-center gap-4 flex-col'
    >
      <h1 className='text-white text-xl font-bold font-display'>
        {username} wins the game!
      </h1>
      <div>{children}</div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </Popup>
  );
};

export default WinScreen;
