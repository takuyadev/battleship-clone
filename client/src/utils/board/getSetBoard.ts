import { IBoard, Coordinates, BoardOptions } from '@models/types';

export const getSetBoard = (
  board: IBoard,
  coords: Coordinates,
  options: BoardOptions
) => {
  const { x, y } = coords;
  const { height, isRotated, isRemove } = options;

  // Set tile determines if to remove ship
  let setTile = isRemove ? 0 : 1;
  let placedBoard = [...board];

  // Logic for up to down
  if (!isRotated) {
    for (let i = x; i > x - height; i--) {
      if (placedBoard[i][y] === undefined) {
        return board;
      }
      placedBoard[i][y] = setTile;
    }

    return placedBoard;
  }

  //Logic for left to right
  if (isRotated) {
    for (let i = y; i > y - height; i--) {
      if (placedBoard[x][i] === undefined) {
        return board;
      }
      placedBoard[x][i] = setTile;
    }

    return placedBoard;
  }

  return board;
};
