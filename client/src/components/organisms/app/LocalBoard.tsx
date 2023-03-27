import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import Confetti from 'react-confetti';
import { useGame } from '@hooks/useGame';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { Game } from '@models/types.common';
import Timer from '@components/molecules/game/Timer';
import { TURN_DELAY } from '@data/constants';

const LocalBoard = ({ player, opponent }: Game) => {
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const { game, isWin, hideBoard, playerTurn, opponentTurn, listenForWin } =
    useGame({ player, opponent });

  // Start timer component
  const startTimer = () => {
    setShow(true);
    setSeconds(TURN_DELAY);
  };

  // useEffect listener for win condition
  listenForWin();

  return (
    <div className='flex'>
      {show && <Timer seconds={seconds} setShow={setShow} />}
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='flex flex-col md:flex-row gap-8 items-center'>
        <ShipList ships={player.ships} />
        <GridBoard
          board={hideBoard('player')}
          isTurn={game.player.isTurn}
          onClick={(x: number, y: number) => {
            opponentTurn({ x, y });
            startTimer();
          }}
        />
        <HiX />
        <GridBoard
          board={hideBoard('opponent')}
          isTurn={game.opponent.isTurn}
          onClick={(x: number, y: number) => {
            playerTurn({ x, y });
            startTimer();
          }}
        />
        <ShipList ships={opponent.ships} />
      </div>
    </div>
  );
};

export default LocalBoard;
