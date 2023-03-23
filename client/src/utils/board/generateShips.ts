import { IShips } from '@models/interfaces';
import { INewShip } from '@models/interfaces';

export const generateShips = (ships: INewShip[], count: number): IShips[] => {
  return ships.map(({ name, height }) => ({
    name: name,
    height: height,
    isPlaced: false,
    isRotated: false,
    hitCount: 0,
    coordinates: []
  }));
};
