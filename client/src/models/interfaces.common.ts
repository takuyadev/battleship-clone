import { Board, Coordinates, Leaderboard, Ships } from './types.common';

export interface Replay {
  boardSize: number;
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

export interface LeaderboardGet {
  success: boolean;
  data: Leaderboard[];
}
