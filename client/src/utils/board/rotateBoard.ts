import { Board } from "@models/types.common";

export const rotateBoard = (board: Board): Board => {
  const rotatedBoard = [...board];

  for (let i = 0; i < rotatedBoard.length; i++) {
    for (let j = 0; j < rotatedBoard[i].length; j++) {
      rotatedBoard[j][i] = rotatedBoard[i][j];
    }
  }

  return rotatedBoard;
};
