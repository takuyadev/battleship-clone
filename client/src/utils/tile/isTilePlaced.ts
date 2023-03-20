import { IBoard, Coordinates } from "@models/types";
import { TILE } from "@data/constants";
const { PLACED } = TILE;

export const isTilePlaced = (board: IBoard, coords: Coordinates) => {
  const { x, y } = coords;

  if (board[x][y] === PLACED) {
    return false;
  }

  return true;
};
