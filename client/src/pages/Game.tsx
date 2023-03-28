import {useContext } from 'react';
import GameOptions from '@components/organisms/app/GameOptions';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '@context/GameContext';

const Game = () => {
  const { config, setConfig } = useContext(GameContext);
  const navigate = useNavigate();

  const onComplete = () => {
    navigate(`/game/${config.gameFormat}`);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <GameOptions
        config={config}
        setConfig={setConfig}
        onComplete={onComplete}
      />
    </div>
  );
};

export default Game;
