import { Board, BoardOption, Coordinate } from '@models/types.common';

// When placing ship on board, check
export const isShipInBoard = (
  board: Board,
  { x, y }: Coordinate,
  { isRotated, height }: BoardOption
) => {

  // Based on rotation, diff algorithm
  if (!isRotated) {
    // If ship height goes over x, then that means the ship height will not fit on the axis
    // -1 is to account for array 0-4 count
    if (height - 1 > x) {
      return false;
    }

    // Loop through board up and down
    for (let i = x; i > x - height; i--) {
      // Return false if ship is in the way (1 === PLACED)
      if (board[i][y] === 1) {
        return false;
      }

      // If I goes over 9 (out of bounds of board), return false
      if (i > 9) {
        return false;
      }
    }
  }

  if (isRotated) {
    if (height - 1 > y) {
      return false;
    }

    // Apply same logic for left and right loop
    for (let i = y; i > y - height; i--) {
      if (board[x][i] === 1) {
        return false;
      }
      if (i > 9) {
        return false;
      }
    }
  }

  // If all checks passes, then the ship is free to be placed
  return true;
};
