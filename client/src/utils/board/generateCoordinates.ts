import { Coordinates } from '@models/types';

export const generateCoordinates = (
  height: number,
  isRotated: boolean,
  { x, y }: Coordinates
) => {
  let result = [];

  if (isRotated) {
    for (let i = 0; i < height; i++) {
      result.push({ x, y: y - i, isHit: false });
    }
  }

  if (!isRotated) {
    for (let i = 0; i < height; i++) {
      result.push({ y, x: x - i, isHit: false });
    }
  }

  return result;
};
