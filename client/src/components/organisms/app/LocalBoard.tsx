import { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import Confetti from 'react-confetti';
import Timer from '@components/molecules/game/Timer';
import Log from '@components/molecules/game/Log';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { PlayerEnum } from '@models/_index';
import { AnimatePresence } from 'framer-motion';

const LocalBoard = () => {
  const {
    game,
    player,
    opponent,
    currentName,
    seconds,
    loading,
    setLoading,
    playerAttack,
    opponentAttack,
    listenForWin,
    hideBoard,
    isWin,
    messages,
  } = useContext(GameContext);

  // useEffect listener for win condition
  listenForWin();

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <AnimatePresence>
        {loading && (
          <Timer name={currentName} seconds={seconds} setShow={setLoading} />
        )}
      </AnimatePresence>
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4'>
        <ShipList
          className='order-2 md:order-3 2xl:order-1'
          ships={player.ships}
          direction='left'
        />
        <GridBoard
          className='order-1 md:order-1 2xl:order-2'
          board={hideBoard(PlayerEnum.PLAYER)}
          isTurn={game.player.isTurn}
          onClick={opponentAttack}
        />
        <GridBoard
          className='order-3 md:order-2 2xl:order-3'
          board={hideBoard(PlayerEnum.OPPONENT)}
          isTurn={game.opponent.isTurn}
          onClick={playerAttack}
        />
        <ShipList
          className='order-4 md:order-4 2xl:order-4'
          ships={opponent.ships}
          direction='right'
        />
      </div>
      <div className='h-full'>
        <Log data={messages} />
      </div>
    </div>
  );
};

export default LocalBoard;
