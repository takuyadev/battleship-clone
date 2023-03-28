import { PLACED } from '@data/constants';
import { Board, Coordinate} from '@models/types.common';

export const isTilePlaced = (board: Board, coords: Coordinate) => {
  const { x, y } = coords;

  if (board[x][y] !== PLACED) {
    return false;
  }

  return true;
};
