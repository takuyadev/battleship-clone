import { Coordinate, Ship, Ships } from '@models/types.common';

export const findShipWithCoords = (
  ships: Ships,
  { x, y }: Coordinate
): Ship | null => {
  for (const ship of ships) {
    for (const tile of ship.coords) {
      const { x: currX, y: currY } = tile.coords;

      // +1 Magic number explanation
      // Since state does not update on current render, it needs to add one to figure out the final result. It seems to provide no side effects with react.strict, so I'm keeping it there
      if (x === currX && y === currY) {
        return ship;
      }
    }
  }
  return null;
};
