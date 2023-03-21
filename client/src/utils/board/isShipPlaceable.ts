import { Coordinates, BoardOptions } from "@models/types";

export const isShipPlaceable = (coords: Coordinates, options: BoardOptions) => {
  const { isRotate, height } = options;
  const { x, y } = coords;

  // If Y is bigger than the height, than ship is placeable
  if (isRotate) {
    return y >= height -1;
  }

  // If X is bigger than the height, than ship is placeable
  return x >= height - 1;
};
