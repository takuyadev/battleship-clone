import { Ships } from '@models/types.common';
import { Coordinate } from '@models/types.common';

export const updateShipByCoords = (ships: Ships, { x, y }: Coordinate) => {
  const newShips = [...ships];
  for (const ship of ships) {
    for (const tile of ship.coords) {
      const { x: currX, y: currY } = tile.coords;

      if (x === currX && y === currY && !tile.isHit) {
        ship.hitCount++;
        tile.isHit = true;
        return newShips;
      }
    }
  }
  return newShips;
};
