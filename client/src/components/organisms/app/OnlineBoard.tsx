import { GameContext } from '@context/GameContext';
import { useContext } from 'react';
import { Socket } from 'socket.io-client';
import { PlayerEnum } from '@models/enum.common';
import GridBoard from '@components/molecules/board/GridBoard';
import Button from '@components/atoms/buttons/Button';
import WinScreen from '@components/molecules/game/WinScreen';
import ShipList from '@components/molecules/game/ShipList';
import Log from '@components/molecules/game/Log';
import { Coordinate } from '@models/_index';
import { useNavigate } from 'react-router-dom';

interface OnlineBoardProps {
  socket: Socket;
  start: boolean;
  playerId: number;
}

const OnlineBoard = ({ socket, start, playerId }: OnlineBoardProps) => {
  const {
    game,
    player,
    opponent,
    messages,
    currentName,
    isWin,
    setIsWin,
    hideBoard,
  } = useContext(GameContext);

  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      {!start ? (
        'waiting...'
      ) : (
        <>
          <WinScreen username={currentName} isWin={isWin}>
            <div>
              <Button text='See board' onClick={() => setIsWin(false)}></Button>
              <Button text='Finish' onClick={() => navigate('/')}></Button>
            </div>
          </WinScreen>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4'>
            <ShipList
              className='order-2 md:order-3 2xl:order-1'
              ships={player.ships}
              direction='left'
            />
            <GridBoard
              className='order-1 md:order-1 2xl:order-2'
              board={player.board}
              isTurn={game.player.isTurn}
              onClick={({ x, y }: Coordinate) => {
                if (playerId === 2) {
                  socket?.emit('opponent_attack', { x, y });
                }
              }}
            />
            <GridBoard
              className='order-3 md:order-2 2xl:order-3'
              board={opponent.board}
              isTurn={game.opponent.isTurn}
              onClick={({ x, y }: Coordinate) => {
                if (playerId === 1) {
                  socket?.emit('player_attack', { x, y });
                }
              }}
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
        </>
      )}
    </div>
  );
};

export default OnlineBoard;
