import { IShips } from '@models/interfaces';
import { Coordinates } from '@models/types';

export const updateShipByCoords = (ships: IShips[], { x, y }: Coordinates) => {
  const newShips = [...ships];
  for (const ship of ships) {
    for (const coord of ship.coordinates) {
      const { x: currX, y: currY } = coord;

      if (x === currX && y === currY && !coord.isHit) {
        ship.hitCount++;
        coord.isHit = true;
        return newShips;
      }
    }
  }
  return newShips;
};
