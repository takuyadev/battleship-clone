import { IBoard } from "../../models/types";

export const generateBoard = (rows: number, columns: number): IBoard => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};
