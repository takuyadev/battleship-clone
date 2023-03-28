import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useGame } from '@hooks/useGame';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { Game, Messages } from '@models/types.common';
import Timer from '@components/molecules/game/Timer';
import { TURN_DELAY } from '@data/constants';
import Log from '@components/molecules/game/Log';
import { GameEnum } from '@hooks/models/_index';

const LocalBoard = ({ player, opponent }: Game) => {
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const {
    game,
    isWin,
    hideBoard,
    playerTurn,
    opponentTurn,
    listenForWin,
    dispatch,
    messages
  } = useGame({ player, opponent });

  // Start timer component
  const startTimer = () => {
    setShow(true);
    setSeconds(TURN_DELAY);
  };

  const opponentAttack = (x: number, y: number) => {
    opponentTurn({ x, y });
    setTimeout(() => {
      dispatch({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  const playerAttack = (x: number, y: number) => {
    playerTurn({ x, y });
    setTimeout(() => {
      dispatch({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  // useEffect listener for win condition
  listenForWin();

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      {show && <Timer seconds={seconds} setShow={setShow} />}
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='grid grid-cols-2 2xl:grid-cols-4 gap-4'>
        <ShipList ships={player.ships} direction="left" />
        <GridBoard
          board={hideBoard('player')}
          isTurn={game.player.isTurn}
          onClick={opponentAttack}
        />
        <GridBoard
          board={hideBoard('opponent')}
          isTurn={game.opponent.isTurn}
          onClick={playerAttack}
        />
        <ShipList ships={opponent.ships} direction="right" />
      </div>
      <div className="h-full">
      <Log data={messages} />

      </div>
    </div>
  );
};

export default LocalBoard;
