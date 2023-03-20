import { IBoard, Coordinates } from "@models/types";

export const updateTile = (
  board: IBoard,
  coords: Coordinates,
  mark: number
): IBoard => {
  const updatedBoard = [...board];
  const { x, y } = coords;

  updatedBoard[x][y] = mark;
  return updatedBoard;
};
