import { Board } from "@models/types.common";

// Generate new board, all filled with 0
export const generateBoard = (rows: number, columns: number): Board => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};
