import { IBoard } from "./types";

export interface IGame {
  player: IPlayer;
  opponent: IPlayer;
}

export interface IPlayer {
  username: string;
  board: IBoard;
}

export interface IPieces {
  height: number;
  isPlaced: boolean;
  coordinates: { x: number; y: number };
}
