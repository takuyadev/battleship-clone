import { createContext, useEffect, useState } from 'react';
import { BoardSize, GameFormat } from '@models/enum.common';
import { useBoard } from '@hooks/useBoard';
import { useShips } from '@hooks/useShips';
import { Config } from '@models/types.common';
import { GameContextInterface } from './model/interfaces.context';
import { ShipsEnum, BoardEnum } from '@hooks/models/_index';

const GameContext = createContext<GameContextInterface>();

const GAME_FORM: Config = {
  gameFormat: GameFormat.LOCAL,
  boardSize: BoardSize.XL,
};

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerBoard, setPlayerBoard] = useBoard({
    x: BoardSize.XL,
    y: BoardSize.XL,
  });
  const [playerShips, setPlayerShips] = useShips();
  const [opponentBoard, setOpponentBoard] = useBoard({
    x: BoardSize.XL,
    y: BoardSize.XL,
  });
  const [opponentShips, setOpponentShips] = useShips();
  const [config, setConfig] = useState(GAME_FORM);

  useEffect(() => {
    setPlayerBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    setOpponentBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });

    setPlayerShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    setOpponentShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
  }, [config]);

  return (
    <GameContext.Provider
      value={{
        player: {
          board: playerBoard,
          setBoard: setPlayerBoard,
          ships: playerShips,
          setShips: setPlayerShips,
        },
        opponent: {
          board: opponentBoard,
          setBoard: setOpponentBoard,
          ships: opponentShips,
          setShips: setOpponentShips,
        },
        config,
        setConfig,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
