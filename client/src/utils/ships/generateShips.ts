import { BoardSize } from '@models/enum.common';
import { NewShip } from '@models/types.common';
import { Ships } from '@models/types.common';

export const generateShips = (ships: NewShip[]): Ships => {
  return ships.map(({ name, height }, i) => ({
    id: i,
    name: name,
    height: height,
    isPlaced: false,
    isRotated: false,
    hitCount: 0,
    coords: [],
  }));
};
