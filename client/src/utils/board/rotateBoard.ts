import { IBoard } from '@models/types';

export const rotateBoard = (board: IBoard): IBoard => {
  const rotatedBoard = [...board];

  for (let i = 0; i < rotatedBoard.length; i++) {
    for (let j = 0; j < rotatedBoard[i].length; j++) {
      rotatedBoard[j][i] = rotatedBoard[i][j];
    }
  }

  return rotatedBoard;
};
