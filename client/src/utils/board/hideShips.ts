import { Board } from "@models/types.common";

// Hide ships from opposing player
// Converts all placed tiles to empty
export const hideShips = (board: Board) => {
  return [...board].map((row) => {
    return row.map((item: number) => (item === 1 ? 0 : item));
  }, []);
};
