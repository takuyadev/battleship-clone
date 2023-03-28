import { Board } from "@models/types.common";
import { PLACED } from "@data/constants";

// Goes through board and checks if all placed tiles are removed / has been hit
export const isBoardLose = (board: Board): boolean => {
  for (const row of board) {
    for (const num of row) {

      // If any tiles are 1, then there are still ships on board
      if (num === PLACED) {
        return false;
      }
    }
  }
  return true;
};
