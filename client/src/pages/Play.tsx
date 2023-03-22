import EditBoard from '@components/organisms/app/EditBoard';
import { useShips } from '@hooks/useShips';
import { useBoard } from '@hooks/useBoard';
import { useState, useRef, useEffect } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import GameOptions from '@components/organisms/app/GameOptions';
import { IConfig } from '@models/interfaces';

const GAME_FORM: IConfig = {
  gameFormat: '',
  boardSize: 10,
};

const Play = () => {
  const [playerBoard, setPlayerBoard] = useBoard({ x: 10, y: 10 });
  const [playerShips, setPlayerShips] = useShips();
  const [config, setConfig] = useState({ ...GAME_FORM });
  const [showBoard, setShowBoard] = useOnOff(false);

  const onComplete = () => {
    setShowBoard({ type: 'on' });
  };

  useEffect(() => {
    setPlayerBoard({
      type: 'initialize-board',
      payload: { boardSize: config.boardSize },
    });
  }, [config]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      {!showBoard && (
        <GameOptions
          setConfig={setConfig}
          onComplete={onComplete}
          config={config}
        />
      )}

      {showBoard && (
        <EditBoard
          board={playerBoard}
          ships={playerShips}
          setBoard={setPlayerBoard}
          setShips={setPlayerShips}
          boardSize={config.boardSize}
        />
      )}
    </div>
  );
};

export default Play;
