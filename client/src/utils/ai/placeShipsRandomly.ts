import { SHIPS } from '@data/constants';
import { Coordinate, Ship } from '@models/_index';

export const placeShipRandomly = (
  isRotated: boolean,
  boardSize: number,
  ship: Ship
): Coordinate => {
  const coords = { x: 0, y: 0 };

  if (isRotated) {
    coords.x = Math.floor(Math.random() * (boardSize - ship.height));
    coords.y = Math.floor(Math.random() * boardSize);
    return coords;
  }

  coords.x = Math.floor(Math.random() * boardSize);
  coords.y = Math.floor(Math.random() * (boardSize - ship.height));
  return coords;
};
