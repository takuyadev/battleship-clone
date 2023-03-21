import { IBoard, Coordinates } from '@models/types';
import { PLACED } from '@data/constants';

export const isTilePlaced = (board: IBoard, coords: Coordinates) => {
  const { x, y } = coords;

  if (board[x][y] !== PLACED) {
    return false;
  }

  return true;
};
