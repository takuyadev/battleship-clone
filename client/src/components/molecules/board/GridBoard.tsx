// ? TypeScript Interfaces
import { IBoard } from '@models/types';
import Board from '@components/atoms/Board';
import GridButton from '@components/atoms/buttons/GridButton';

const ALPHABET = 'ABCDEFHIJK'.split('');

interface IGridBoard_Props {
  board: IBoard;
  isRotated: boolean;
  onClick: (x: number, y: number) => void;
}
/*
  BOARD LEGEND
  1 === ship is there
  0 === ship is not there
  -1 === ship was not there, and has been hit
  -2 === ship was there, and has been hit
*/

const GridBoard = ({ board, isRotated, onClick }: IGridBoard_Props) => {
  return (
    <Board size={board.length}>
      {board &&
        board.map((arr, x) => (
          <div className="flex gap-2 justify-between">
            {arr.map((num, y) => {
              const tileName = ALPHABET[y] + (x + 1);
              return (
                <GridButton
                  key={y}
                  text={tileName}
                  status={num}
                  onClick={() => onClick(x, y)}
                />
              );
            })}
          </div>
        ))}
    </Board>
  );
};

export default GridBoard;
