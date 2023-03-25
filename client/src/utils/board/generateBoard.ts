import { Board } from "@models/types.common";

export const generateBoard = (rows: number, columns: number): Board => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};
