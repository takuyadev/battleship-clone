// Updates board based on the opponents decision
import { Coordinates, IBoard } from "../models/types";
import { TILE } from "./constants/board";
const { PLACED } = TILE;

// Updates tile based on mark provided
const updateTile = (
  board: IBoard,
  coords: Coordinates,
  mark: number
): IBoard => {
  const updatedBoard = [...board];
  const { x, y } = coords;

  updatedBoard[x][y] === mark;
  return updatedBoard;
};

// Checks if has a ship placed, returns false if it does
const isTilePlaced = (board: IBoard, coords: Coordinates) => {
  const { x, y } = coords;

  if (board[x][y] === PLACED) {
    return false;
  }

  return true;
};

export { updateTile, isTilePlaced };
