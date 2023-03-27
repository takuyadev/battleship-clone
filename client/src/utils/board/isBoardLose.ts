import { Board } from "@models/types.common";
import { PLACED } from "@data/constants";

export const isBoardLose = (board: Board): boolean => {
  for (const row of board) {
    for (const num of row) {
      if (num === PLACED) {
        return false;
      }
    }
  }
  return true;
};
