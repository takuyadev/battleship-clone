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
  playerShips,
  setPlayerShips,
  opponentShips,
  setOpponentShips,
  opponentBoard,
  setOpponentBoard,
}: IGameBoard) => {
  const [turn, setTurn] = useTurn();
  const [notification, setNotification] = useState('');
  const [replay, setReplay] = useState({
    player: {
      board: playerBoard,
      moves: [],
    },
    opponent: {
      board: opponentBoard,
      moves: [],
    },
  });

  const checkHide = (name: 'opponent' | 'player'): IBoard => {
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
          board={checkHide('player')}
          isTurn={!turn.player.isTurn}
          onClick={(x: number, y: number) => {
            setPlayerBoard({
              type: 'attack-tile',
              payload: { coords: { x, y } },
            });
            setTurn({ type: 'player-attack-turn' });
            setPlayerShips({
              type: 'update-hitcount',
              payload: { coords: { x, y } },
            });
            setTimeout(() => {
              setTurn({ type: 'opponent-turn' });
            }, 3000);
          }}
        />
        <div className='flex flex-col'>
          {playerShips.map((ship) => {
            console.log(ship.name, ship.height, ship.hitCount)
            return (
              <p
                className={`${ship.hitCount >= ship.height && 'line-through'}`}
              >
                {ship.name} - {ship.hitCount}
              </p>
            );
          })}
          {opponentShips.map((ship) => {
            return (
              <p
                className={`${ship.hitCount >= ship.height && 'line-through'}`}
              >
                {ship.name} - {ship.hitCount}
              </p>
            );
          })}
        </div>
        <HiX />
        <GridBoard
          board={checkHide('opponent')}
          isTurn={!turn.opponent.isTurn}
          onClick={(x: number, y: number) => {
            setOpponentBoard({
              type: 'attack-tile',
              payload: { coords: { x, y } },
            });
            setOpponentShips({
              type: 'update-hitcount',
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
