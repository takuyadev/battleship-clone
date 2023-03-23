import GridBoard from '@components/molecules/board/GridBoard';
import { IGameBoard } from '@models/interfaces';

const ComputerBoard = ({
  playerBoard,
  setPlayerBoard,
  opponentBoard,
  setOpponentBoard,
}: IGameBoard) => {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <GridBoard board={playerBoard} onClick={(x: number, y: number) => {}} />
      <GridBoard board={opponentBoard} onClick={(x: number, y: number) => {}} />
    </div>
  );
};

export default ComputerBoard;
