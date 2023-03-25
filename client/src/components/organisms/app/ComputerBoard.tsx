import GridBoard from '@components/molecules/board/GridBoard';
import { Game } from '@models/types.common';

const ComputerBoard = ({ player, opponent }: Game) => {
  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <GridBoard board={player.board} onClick={(x: number, y: number) => {}} />
      <GridBoard
        board={opponent.board}
        onClick={(x: number, y: number) => {}}
      />
    </div>
  );
};

export default ComputerBoard;
