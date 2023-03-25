import { Board } from "@models/types.common";

export const hideShips = (board: Board) => {
  return [...board].map((row) => {
    return row.map((item: number) => (item === 1 ? 0 : item));
  }, []);
};
