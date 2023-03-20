import { IBoard } from "../../models/types";
import { TILE } from "@data/constants";
const { PLACED } = TILE;

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
