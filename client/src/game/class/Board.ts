export interface IBoard {
  username: string;
  board: number[][];
}

export interface IBoard_Props {
  username: string;
  rows: number;
  columns: number;
}

class Board {
  username: string;
  board: number[][];

  constructor({ username, rows, columns }: IBoard_Props) {
    // Uses Array.from to shallow copy; not copy reference
    this.username = username;
    this.board = Array.from({ length: columns }, () => Array(rows).fill(0));
  }

  updateUsername(username: string) {
    this.username = username;
  }

  startBoard() {
    return this.board;
  }

  // Updates board based on the opponents decision
  markTile({ x, y }: { x: number; y: number }) {
    this.board[x][y] = -1;
  }
}

export default Board;
