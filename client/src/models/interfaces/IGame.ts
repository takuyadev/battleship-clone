import { IBoard } from "../types/Game";

export interface IGame {
  player: IPlayer;
  opponent: IPlayer;
}

export interface IPlayer {
  username: string;
  board: IBoard;
}
