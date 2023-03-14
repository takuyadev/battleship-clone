import { IBoard } from "./Board";

export interface IGame_Props {
  playerData: IBoard;
  opponentData: IBoard;
}

class Game {
  playerData: IBoard;
  opponentData: IBoard;
  isTurn: boolean;

  constructor({ playerData, opponentData }: IGame_Props) {
    this.playerData = playerData;
    this.opponentData = opponentData;
    this.isTurn = true;
  }

  updateTurn() {
    this.isTurn = !this.isTurn;
  }
}

export default Game;
