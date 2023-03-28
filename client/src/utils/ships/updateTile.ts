import { Board } from "@models/types.common";
import { Coordinate } from "@models/types.common";

// Allows you to choose type of mark (1, 0, -1, -2) (EMPTY, MARKED_PLACE... etc.)
// Allows you to update to new mark based on coords arg
export const updateTile = (
  board: Board,
  coords: Coordinate,
  mark: number
): Board => {
  const updatedBoard = [...board];
  const { x, y } = coords;

  updatedBoard[x][y] = mark;
  return updatedBoard;
};
