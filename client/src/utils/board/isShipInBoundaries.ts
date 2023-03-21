import { Coordinates, BoardOptions, IBoard } from '@models/types';

export const isShipInBoundaries = (
  board: IBoard,
  coords: Coordinates,
  options: BoardOptions
) => {
  let result = true;
  const { isRotated, height } = options;
  const { x, y } = coords;

  // Logic for up to down
  if (!isRotated) {
    if (height - 1 > x) {
      return false;
    }
    for (let i = x; i > x - height; i--) {
      if (board[i][y] === 1) {
        result = false;
      }
      if (i > 9) {
        result = false;
      }
    }
  }

  //Logic for left to right
  if (isRotated) {
    if (height - 1 > y) {
      return false;
    }

    for (let i = y; i > y - height; i--) {
      if (board[x][i] === 1) {
        result = false;
      }
      if (i > 9) {
        result = false;
      }
    }
  }

  return result;
};
