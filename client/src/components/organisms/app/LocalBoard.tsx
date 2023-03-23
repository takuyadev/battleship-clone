import GridBoard from '@components/molecules/board/GridBoard';
import { useTurn } from '@hooks/useTurn';
import { IGameBoard } from '@models/interfaces';
import { IBoard } from '@models/types';
import { hideShips, isBoardWin } from '@utils/index';
import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

const LocalBoard = ({
  playerBoard,
  setPlayerBoard,
  opponentBoard,
  setOpponentBoard,
}: IGameBoard) => {
  const [turn, setTurn] = useTurn();
  const [notification, setNotification] = useState('');

  const checkHide = (name: 'opponent' | 'player', board: IBoard): IBoard => {
    if (name === 'player') {
      return !turn.player.isHide ? hideShips(playerBoard) : playerBoard;
    }
    return !turn.opponent.isHide ? hideShips(opponentBoard) : opponentBoard;
  };

  useEffect(() => {
    if (isBoardWin(playerBoard)) {
      setNotification('player win');
    }
    if (isBoardWin(playerBoard)) {
      setNotification('opponent win');
    }
  }, [turn]);

  return (
    <div className='flex'>
      {notification}
      <div className='flex flex-col md:flex-row gap-8 items-center'>
        <GridBoard
          board={checkHide('player', playerBoard)}
          isTurn={!turn.player.isTurn}
          onClick={(x: number, y: number) => {
            setPlayerBoard({
              type: 'attack-tile',
              payload: { coords: { x, y } },
            });
            setTurn({ type: 'player-attack-turn' });
            setTimeout(() => {
              console.log(turn);
              setTurn({ type: 'opponent-turn' });
            }, 3000);
          }}
        />
        <HiX />
        <GridBoard
          board={checkHide('opponent', opponentBoard)}
          isTurn={!turn.opponent.isTurn}
          onClick={(x: number, y: number) => {
            setOpponentBoard({
              type: 'attack-tile',
              payload: { coords: { x, y } },
            });
            setTurn({ type: 'opponent-attack-turn' });
            setTimeout(() => {
              setTurn({ type: 'player-turn' });
            }, 3000);
          }}
        />
      </div>
    </div>
  );
};

export default LocalBoard;
