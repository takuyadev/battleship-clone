import { BoardOptions, Coordinates, IBoard } from "../models/types";
import { TILE } from "./constants/board";
const { PLACED, EMPTY, MARKED_EMPTY, MARKED_PLACED } = TILE;

// Generate board using Array.from to prevent shallow copy
const generateBoard = (rows: number, columns: number): IBoard => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};

// Only shows marked tiles
const hideShips = (board: IBoard) => {
  return [...board].map((row) => {
    return row.map((item: number) => (item === 1 ? 0 : item));
  }, []);
};

// Updates board based on the opponents decision
const isBoardWin = (board: IBoard): boolean => {
  for (const row of board) {
    for (const num of row) {
      if (num === PLACED) {
        return true;
      }
    }
  }
  return false;
};

// Checks if ship is placeable
const isShipPlaceable = (coords: Coordinates, options: BoardOptions) => {
  const { isRotate, height } = options;
  const { x, y } = coords;

  if (isRotate) {
    return height < y;
  }

  return height < x;
};

// This edits the board, and returns the edited board
const editBoard = (
  board: IBoard,
  coords: Coordinates,
  options: {
    height: number;
    isRotate: boolean;
    isRemove: boolean;
  }
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

export { isShipPlaceable, hideShips, editBoard, isBoardWin, generateBoard };
