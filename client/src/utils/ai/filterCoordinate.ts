import { Coordinate, Coordinates } from '@models/types.common';

export const filterCoordinates = (
  board: Coordinates,
  { x: currX, y: currY }: Coordinate
) => {
  return [...board].filter(({ x, y }) => {
    if (currX === x && currY === y) {
      return false;
    }
    return true;
  });
};
