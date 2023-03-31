import { createContext } from 'react';
import { useGame } from '@hooks/useGame';
import { GameContextInterface } from './model/interfaces.context';

//@ts-ignore
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
    setIsWin,
    playerTurn,
    setMessages,
    hideBoard,
    listenForWin,
    setGame,
    setGameOver,
    endGame,
    computerPlaceShips,
    opponentAttack,
    playerAttack,
    attackAgainstComputer,
    updateLeaderboard,
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
        setIsWin,
        setGameOver,
        setGame,
        setConfig,
        endGame,
        setSeconds,
        playerTurn,
        setMessages,
        hideBoard,
        computerPlaceShips,
        listenForWin,
        opponentAttack,
        playerAttack,
        attackAgainstComputer,
        updateLeaderboard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
