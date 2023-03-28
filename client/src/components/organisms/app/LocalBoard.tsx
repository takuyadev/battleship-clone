import { useContext, useState } from 'react';
import Confetti from 'react-confetti';
import Timer from '@components/molecules/game/Timer';
import Log from '@components/molecules/game/Log';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { GameEnum } from '@hooks/models/_index';
import { PlayerEnum } from '@models/_index';
import { TURN_DELAY } from '@data/constants';
import { AnimatePresence } from 'framer-motion';
import { GameContext } from '@context/GameContext';

const LocalBoard = () => {
  const {
    game,
    player,
    opponent,
    playerTurn,
    setGame,
    listenForWin,
    hideBoard,
    isWin,
    messages,
  } = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('Player 1');

  // Start and show timer component
  const startTimer = () => {
    setShow(true);
    setSeconds(TURN_DELAY);
  };

  // Activate turn, based on type provided in playerTurn
  const opponentAttack = (x: number, y: number) => {
    playerTurn(PlayerEnum.OPPONENT, { x, y });
    setName('Player 2');
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  const playerAttack = (x: number, y: number) => {
    playerTurn(PlayerEnum.PLAYER, { x, y });
    setName('Player 1');
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  // useEffect listener for win condition
  listenForWin();

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <AnimatePresence>
        {show && <Timer name={name} seconds={seconds} setShow={setShow} />}
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
