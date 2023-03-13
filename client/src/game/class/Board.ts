export interface IBoard {
  board: any[]
}

export interface IBoard_Props {
  columns: number;
  rows: number;
}

class Board {
  board: any[];

  constructor({ columns, rows }: IBoard_Props) {
    this.board = Array.from({ length: rows }, () => Array(columns).fill(0));
  }

  // Uses Array.from to shallow copy; not copy reference
  startBoard() {
    return this.board;
  }

  // Updates board based on the opponents decision
  updateBoard(x:number, y:number) {
    this.board[x][y] = -1
  }
}

export default Board;
