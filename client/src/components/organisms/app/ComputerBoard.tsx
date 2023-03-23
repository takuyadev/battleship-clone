import GridBoard from '@components/molecules/board/GridBoard';
import { IGameBoard } from '@models/interfaces';

const ComputerBoard = ({
  playerBoard,
  setPlayerBoard,
  opponentBoard,
  setOpponentBoard,
  setIsTurn,
  isTurn,
}: IGameBoard) => {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <GridBoard
        board={playerBoard}
        onClick={(x: number, y: number) => {
          setPlayerBoard({
            type: 'attack-tile',
            payload: { coords: { x, y } },
          });
        }}
        isTurn={true}
      />
      <GridBoard
        board={opponentBoard}
        onClick={(x: number, y: number) => {
          setOpponentBoard({
            type: 'attack-tile',
            payload: { coords: { x, y } },
          });
          setIsTurn({ type: 'off' });
        }}
        isTurn={!isTurn}
      />
    </div>
  );
};

export default ComputerBoard;
