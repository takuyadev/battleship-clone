import { IBoard } from "../../models/types";
import { PLACED } from "@data/constants";

export const isBoardWin = (board: IBoard): boolean => {
  for (const row of board) {
    for (const num of row) {
      if (num === PLACED) {
        return true;
      }
    }
  }
  return false;
};
