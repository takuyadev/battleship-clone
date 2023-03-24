import { IBoard } from "../../models/types";
import { PLACED } from "@data/constants";

export const isBoardLose = (board: IBoard): boolean => {
  for (const row of board) {
    for (const num of row) {
      if (num === PLACED) {
        return false;
      }
    }
  }
  return true;
};
