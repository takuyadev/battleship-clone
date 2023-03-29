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
