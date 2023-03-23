import { IShips } from '@models/interfaces';

export const isAllShipsPlaced = (ships: IShips[]) => {
  for (const ship of ships) {
    if (!ship.isPlaced) {
      return false;
    }
  }
  return true;
};
