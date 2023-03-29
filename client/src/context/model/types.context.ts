import { SetBoard, SetShips } from '@models/_index'
import { Ships, Board } from '@models/types.common';

export type PlayerOptions = {
  name: string
  board: Board;
  setBoard: SetBoard;
  ships: Ships;
  setShips: SetShips
};
