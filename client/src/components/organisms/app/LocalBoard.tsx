import GridBoard from '@components/molecules/board/GridBoard';
import { IGameBoard } from '@models/interfaces';
import { HiX } from 'react-icons/hi';
import { useGame } from '@hooks/useGame';
import { useEffect, useState } from 'react';
import { isBoardLose } from '@utils/index';
import Confetti from 'react-confetti';

const LocalBoard = ({
  playerBoard,
  setPlayerBoard,
  playerShips,
  setPlayerShips,
  opponentShips,
  setOpponentShips,
  opponentBoard,
  setOpponentBoard,
}: IGameBoard) => {
  const { game, hideBoard, playerTurn, opponentTurn } = useGame({
    setPlayerShips,
    setPlayerBoard,
    setOpponentBoard,
    setOpponentShips,
    playerBoard,
    playerShips,
    opponentBoard,
    opponentShips,
  });
  const [isWin, setIsWin] = useState<string | null>(null);

  useEffect(() => {
    if (isBoardLose(playerBoard)) {
      setIsWin('opponent');
    }
    if (isBoardLose(opponentBoard)) {
      setIsWin('player');
    }
  }, [game]);

  return (
    <div className='flex'>
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='flex flex-col md:flex-row gap-8 items-center'>
        <div className='flex flex-col'>
          {playerShips.map((ship) => {
            console.log(ship.name, ship.hitCount);
            return (
              <p
                className={`${ship.hitCount === ship.height && 'line-through'}`}
              >
                {ship.name}
              </p>
            );
          })}
        </div>
        <GridBoard
          board={hideBoard('player')}
          isTurn={game.player.isTurn}
          onClick={(x: number, y: number) => {
            opponentTurn({ x, y });
          }}
        />
        <HiX />
        <GridBoard
          board={hideBoard('opponent')}
          isTurn={game.opponent.isTurn}
          onClick={(x: number, y: number) => {
            playerTurn({ x, y });
          }}
        />
        <div className='flex flex-col'>
          {opponentShips.map((ship) => {
            return (
              <p
                className={`${ship.hitCount === ship.height && 'line-through'}`}
              >
                {ship.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocalBoard;
