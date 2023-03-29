import { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import { PlayerEnum } from '@models/enum.common';
import GridBoard from '@components/molecules/board/GridBoard';
import ShipList from '@components/molecules/game/ShipList';
import Log from '@components/molecules/game/Log';

const ComputerBoard = () => {
  const { game, player, opponent, hideBoard, messages, attackAgainstComputer } = useContext(GameContext);
  
  return (
    <div className='flex flex-col gap-4 w-full h-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4'>
        <ShipList
          className='order-2 md:order-3 2xl:order-1'
          ships={player.ships}
          direction='left'
        />
        <GridBoard
          className='order-1 md:order-1 2xl:order-2'
          board={hideBoard(PlayerEnum.PLAYER)}
          onClick={()=>{}}
          isTurn={true}
        />
        <GridBoard
          className='order-3 md:order-2 2xl:order-3'
          board={hideBoard(PlayerEnum.OPPONENT)}
          isTurn={game.opponent.isTurn}

          onClick={attackAgainstComputer}
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

export default ComputerBoard;
