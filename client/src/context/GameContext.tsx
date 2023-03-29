import { useState, useEffect, createContext } from 'react';
import { useGame } from '@hooks/useGame';
import { BoardSize, GameFormat, Config } from '@models/_index';
import { BoardEnum, ShipsEnum } from '@hooks/models/_index';
import { GameContextInterface } from './model/interfaces.context';

const GameContext = createContext<GameContextInterface>({});

const GAME_FORM: Config = {
  gameFormat: GameFormat.LOCAL,
  boardSize: BoardSize.XL,
};

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    game,
    player,
    opponent,
    isWin,
    messages,
    currentName,
    seconds,
    config,
    setConfig,
    loading,
    setLoading,
    setSeconds,
    playerTurn,
    setMessages,
    hideBoard,
    listenForWin,
    setGame,
    opponentAttack,
    playerAttack,
    attackAgainstComputer,
  } = useGame({ x: 10, y: 10 });


  return (
    <GameContext.Provider
      value={{
        game,
        config,
        player,
        opponent,
        messages,
        isWin,
        currentName,
        seconds,
        loading,
        setLoading,
        playerTurn,
        setMessages,
        hideBoard,
        listenForWin,
        setGame,
        setConfig,
        setSeconds,
        opponentAttack,
        playerAttack,
        attackAgainstComputer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
