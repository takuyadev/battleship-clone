import { Board } from '@models/types.common';
import BoardUI from '@components/atoms/ui/Board';
import GridButton from '@components/atoms/buttons/GridButton';

const ALPHABET = 'ABCDEFHIJK';

export interface GridBoardProps {
  board: Board;
  onClick: (x: number, y: number) => void;
  isTurn?: boolean;
}

/*
  BOARD LEGEND
  1 === ship is there
  0 === ship is not there
  -1 === ship was not there, and has been hit
  -2 === ship was there, and has been hit
*/

const GridBoard = ({ board, isTurn = false, onClick }: GridBoardProps) => {
  const boardSize = board.length;

  return (
    <BoardUI size={boardSize}>
      {board &&
        board.map((col, x) => (
          <div key={x} className='flex gap-2 justify-between'>
            {col.map((row, y) => {
              // Ex. A1, A2, J3... etc.
              const markNumber = ALPHABET[y] + (x + 1);

              return (
                <GridButton
                  key={y}
                  className={`${isTurn && 'pointer-events-none'}`}
                  status={row}
                  disabled={isTurn}
                  text={markNumber}
                  onClick={() => {
                    onClick(x, y);
                  }}
                />
              );
            })}
          </div>
        ))}
    </BoardUI>
  );
};

export default GridBoard;
