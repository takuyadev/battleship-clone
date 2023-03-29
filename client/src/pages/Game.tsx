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
    <PageTransition>
      <GameOptions
        config={config}
        setConfig={setConfig}
        onComplete={onComplete}
      />
    </PageTransition>
  );
};

export default Game;
