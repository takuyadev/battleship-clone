import { useState, useEffect, createContext } from 'react';
import { BoardSize, GameFormat } from '@models/enum.common';
import { useGame } from '@hooks/useGame';
import { Config } from '@models/types.common';
import { GameContextInterface } from './model/interfaces.context';
import { ShipsEnum, BoardEnum } from '@hooks/models/_index';

const GameContext = createContext<GameContextInterface>({});

const GAME_FORM: Config = {
  gameFormat: GameFormat.LOCAL,
  boardSize: BoardSize.XL,
};

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState(GAME_FORM);
  const {
    game,
    player,
    opponent,
    isWin,
    messages,
    playerTurn,
    setMessages,
    hideBoard,
    listenForWin,
    setGame,
  } = useGame({ x: 10, y: 10 });

  useEffect(() => {
    player.setBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    opponent.setBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });

    player.setShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    opponent.setShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
  }, [config]);

  useEffect(() => {
    console.log(opponent.board)
    console.log(opponent.ships)
  }, [player.board, opponent.board]);

  return (
    <GameContext.Provider
      value={{
        game,
        config,
        player,
        opponent,
        isWin,
        messages,
        playerTurn,
        setMessages,
        hideBoard,
        listenForWin,
        setGame,
        setConfig,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
