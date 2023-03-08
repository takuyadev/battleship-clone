interface IBoard_Props {
  columns: number;
  rows: number;
}

class Board {
  columns: number;
  rows: number;

  constructor({ columns, rows }: IBoard_Props) {
    this.columns = columns;
    this.rows = rows;
  }

  // Uses Array.from to shallow copy; not copy reference
  getBoard() {
    return Array.from({ length: this.rows }, (e) => Array(this.columns).fill(0));
  }
}

export default Board;


