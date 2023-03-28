import { useState } from 'react';
import { useGame } from '@hooks/useGame';
import Confetti from 'react-confetti';
import Timer from '@components/molecules/game/Timer';
import Log from '@components/molecules/game/Log';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { GameEnum } from '@hooks/models/_index';
import { Game, PlayerEnum } from '@models/_index';
import { TURN_DELAY } from '@data/constants';

const LocalBoard = ({ player, opponent }: Game) => {
  const [seconds, setSeconds] = useState(0);
  const [show, setShow] = useState(false);
  const {
    game,
    isWin,
    hideBoard,
    playerTurn,
    listenForWin,
    dispatch,
    messages,
  } = useGame({ player, opponent });

  // Start and show timer component
  const startTimer = () => {
    setShow(true);
    setSeconds(TURN_DELAY);
  };

  // Activate turn, based on type provided in playerTurn
  const opponentAttack = (x: number, y: number) => {
    playerTurn(PlayerEnum.OPPONENT, { x, y });
    setTimeout(() => {
      dispatch({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  const playerAttack = (x: number, y: number) => {
    playerTurn(PlayerEnum.PLAYER, { x, y });
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
        <ShipList
          className='order-3 2xl:order-1'
          ships={player.ships}
          direction='left'
        />
        <GridBoard
          className='2xl:order-2'
          board={hideBoard(PlayerEnum.PLAYER)}
          isTurn={game.player.isTurn}
          onClick={opponentAttack}
        />
        <GridBoard
          className='2xl:order-3'
          board={hideBoard(PlayerEnum.OPPONENT)}
          isTurn={game.opponent.isTurn}
          onClick={playerAttack}
        />
        <ShipList
          className='order-4 2xl:order-4'
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
