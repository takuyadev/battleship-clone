import { IBoard } from "@models/types";

const selectMove = (board: IBoard): number[] => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  return [x, y];
};

export { selectMove };