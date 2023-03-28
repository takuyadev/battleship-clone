import { Board } from '@models/types.common';

// Selects random move 
const selectMove = (board: Board): number[] => {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  return [x, y];
};

export { selectMove };
