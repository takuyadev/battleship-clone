import { createContext, useEffect, useState } from 'react';
import { useBoard } from '@hooks/useBoard';
import { useShips } from '@hooks/useShips';
import { useOnOff } from '@hooks/useOnOff';
import { IConfig, IGameContext } from '@models/interfaces';
const GameContext = createContext<IGameContext>();

const GAME_FORM: IConfig = {
  gameFormat: 'local',
  boardSize: 10,
};

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerBoard, setPlayerBoard] = useBoard({ x: 10, y: 10 });
  const [playerShips, setPlayerShips] = useShips();
  const [opponentBoard, setOpponentBoard] = useBoard({ x: 10, y: 10 });
  const [opponentShips, setOpponentShips] = useShips();

  const [showBoard, setShowBoard] = useOnOff(false);
  const [config, setConfig] = useState(GAME_FORM);

  useEffect(() => {
    setPlayerBoard({
      type: 'initialize-board',
      payload: { boardSize: config.boardSize },
    });
    setOpponentBoard({
      type: 'initialize-board',
      payload: { boardSize: config.boardSize },
    });

    setPlayerShips({
      type: 'initialize-ships',
      payload: null,
    });
    setOpponentShips({
      type: 'initialize-ships',
      payload: null,
    });
  }, [config]);

  return (
    <GameContext.Provider
      value={{
        config,
        playerBoard,
        setPlayerBoard,
        playerShips,
        setPlayerShips,
        opponentBoard,
        setOpponentBoard,
        opponentShips,
        setOpponentShips,
        showBoard,
        setShowBoard,
        setConfig,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
