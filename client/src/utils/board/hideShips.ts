import { IBoard } from "../../models/types";

export const hideShips = (board: IBoard) => {
  return [...board].map((row) => {
    return row.map((item: number) => (item === 1 ? 0 : item));
  }, []);
};
