import { Coordinate, Ships } from '@models/types.common';

export const isShipDestroyed = (ships: Ships, { x, y }: Coordinate) => {
  for (const ship of ships) {
    for (const tile of ship.coords) {
      const { x: currX, y: currY } = tile.coords;
      if (x === currX && y === currY) {
        return ship.hitCount + 1 === ship.height
      }
    }
  }
  return false
};
