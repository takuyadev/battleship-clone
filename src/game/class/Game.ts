interface IGame_Props {
  board: any[];
  playerBoard: any[];
  opponentBoard: any[];
  isTurn: boolean;
}

class Game {
  board: any[];
  playerBoard: any[];
  opponentBoard: any[];

  isTurn: boolean;

  constructor({ board, isTurn, playerBoard, opponentBoard }: IGame_Props) {
    this.board = board;
    this.playerBoard = playerBoard;
    this.opponentBoard = opponentBoard;
    this.isTurn = isTurn;
  }
}

export default Game;
