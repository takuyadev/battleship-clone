import { IBoard, Coordinates, BoardOptions } from "@models/types";

export const getSetBoard = (
  board: IBoard,
  coords: Coordinates,
  options: BoardOptions
) => {
  const { x, y } = coords;
  const { height, isRotate, isRemove } = options;

  // Set tile determines if to remove ship
  let setTile = isRemove ? 0 : 1;
  let placedBoard = [...board];

  // Logic for up to down
  if (!isRotate) {
    for (let i = x; i > x - height; i--) {
      placedBoard[i][y] = setTile;
    }
    return placedBoard;
  }

  //Logic for left to right
  if (isRotate) {
    for (let i = y; i > y - height; i--) {
      placedBoard[x][i] = setTile;
    }
    return placedBoard;
  }

  return board;
};
