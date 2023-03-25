import { Board, Coordinates, Ships } from './types.common';

export interface Replay {
  player: {
    board: Board;
    ships: Ships;
  };
  opponent: {
    board: Board;
    ships: Ships;
  };
  moves: Coordinates;
}
