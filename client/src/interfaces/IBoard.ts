export interface IBoard {
  player: IPlayer;
  opponent: IPlayer;
}

export interface IPlayer {
  username: string;
  board: number[][];
}
