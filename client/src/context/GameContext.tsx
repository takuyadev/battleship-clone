import { createContext } from 'react';
import { useGame } from '@hooks/useGame';
import { GameContextInterface } from './model/interfaces.context';

const GameContext = createContext<GameContextInterface>({});

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
    loading,
    turnCount,
    setConfig,
    setLoading,
    setSeconds,
    playerTurn,
    setMessages,
    hideBoard,
    listenForWin,
    setGame,
    setGameOver,
    opponentAttack,
    playerAttack,
    attackAgainstComputer,
    showBoardEnd,
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
        turnCount,
        setLoading,
        playerTurn,
        setMessages,
        hideBoard,
        listenForWin,
        setGameOver,
        setGame,
        setConfig,
        setSeconds,
        opponentAttack,
        playerAttack,
        attackAgainstComputer,
        showBoardEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
