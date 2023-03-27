import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import { HiX } from 'react-icons/hi';
import { useGame } from '@hooks/useGame';
import Confetti from 'react-confetti';
import { Game } from '@models/types.common';

const LocalBoard = ({ player, opponent }: Game) => {
  const { game, isWin, hideBoard, playerTurn, opponentTurn, listenForWin } =
    useGame({ player, opponent });

  // useEffect listener for win condition
  listenForWin();

  return (
    <div className='flex'>
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='flex flex-col md:flex-row gap-8 items-center'>
        <ShipList ships={player.ships} />
        <GridBoard
          board={hideBoard('player')}
          isTurn={game.player.isTurn}
          onClick={(x: number, y: number) => opponentTurn({ x, y })}
        />
        <HiX />
        <GridBoard
          board={hideBoard('opponent')}
          isTurn={game.opponent.isTurn}
          onClick={(x: number, y: number) => playerTurn({ x, y })}
        />
        <ShipList ships={opponent.ships} />
      </div>
    </div>
  );
};

export default LocalBoard;
