import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '@context/GameContext';
import GameOptions from '@components/organisms/app/GameOptions';
import PageTransition from '@components/atoms/ui/PageTransition';

const Game = () => {
  const { config, setConfig } = useContext(GameContext);
  const navigate = useNavigate();

  const onComplete = () => {
    navigate(`/game/${config.gameFormat}`);
  };

  return (
    <PageTransition className='flex items-center h-[80vh]'>
      <div className="flex flex-col items-center gap-4">
        <h1 className='font-display text-2xl font-bold block'>
          Play a quick round of battleships
        </h1>
        <GameOptions
          config={config}
          setConfig={setConfig}
          onComplete={onComplete}
        />
      </div>
    </PageTransition>
  );
};

export default Game;
