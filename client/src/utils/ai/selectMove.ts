import { Coordinate, Coordinates } from '@models/types.common';

// Selects random move based on how many moves are left inside the computerCheck array
const selectMove = (moves: Coordinates): Coordinate => {
  const maxIndex = moves.length;
  const selectedIndex = Math.floor(Math.random() * maxIndex) - 1;
  return moves[selectedIndex];
};

export { selectMove };
