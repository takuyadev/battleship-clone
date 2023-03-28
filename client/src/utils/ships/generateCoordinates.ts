import { Coordinate } from '@models/types.common';

export const generateCoordinates = (
  height: number,
  isRotated: boolean,
  { x, y }: Coordinate
) => {
  let result = [];

  if (isRotated) {
    for (let i = 0; i < height; i++) {
      result.push({ coords: { x, y: y - i }, isHit: false });
    }
  }

  if (!isRotated) {
    for (let i = 0; i < height; i++) {
      result.push({ coords: { y, x: x - i }, isHit: false });
    }
  }

  return result;
};
