// ? TypeScript Interfaces
import { IBoard } from '@models/types';
import Board from '@components/atoms/Board';
import GridButton from '@components/atoms/buttons/GridButton';

interface IGridBoard_Props {
  board: IBoard;
  onClick: (x: number, y: number) => void;
}
/*
  BOARD LEGEND
  1 === ship is there
  0 === ship is not there
  -1 === ship was not there, and has been hit
  -2 === ship was there, and has been hit
*/

const GridBoard = ({ board, onClick }: IGridBoard_Props) => {
  return (
    <Board>
      {board &&
        board.map((arr, x) => (
          <div key={x}>
            {arr.map((num, y) => (
              <GridButton
                key={y}
                className={`${
                  num === -1 || num === -2 ? 'bg-red-200' : 'bg-green-200'
                }`}
                onClick={() => onClick(x, y)}
              >
                {num}
              </GridButton>
            ))}
          </div>
        ))}
    </Board>
  );
};

export default GridBoard;
