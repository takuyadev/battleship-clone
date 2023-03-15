import { IBoard } from "../models/types/Game";

// If tile is already marked, then return false
const checkTile = (board: IBoard, x: number, y:number) => {
  if (board[x][y] === -1){
    return false
  }

  return true
}


// Only shows marked tiles
const formatBoard = (board: IBoard, isShow: boolean): IBoard => {
  // Algorithm to hide your ships from viewing when returning map
  if (!isShow) {
    let result: number[][] = [];

    // Loop through each row, filter if [x][y] === 1 (1 === ship is there)
    for (const row of board) {
      const filteredRow = row.map((item) => (item === 1 ? 0 : item));

      // Push filtered row to results
      result.push(filteredRow);
    }
    return result;
  }
  return board;
};

// Updates board based on the opponents decision
const attackTile = (board: IBoard, x: number, y: number): IBoard => {
  // If ship was on tile, and got marked
  if (board[x][y] === 1) {
    board[x][y] = -2;
  }

  // Else, mark normally
  board[x][y] = -1;
  return board;
};

// Updates board based on the opponents decision
const isBoardWin = (board: IBoard): boolean => {

  for (const row of board) {
    for (const num of row) {
      if (num === 1) {
        return true;
      }
    }
  }

  return false;
};

// Generate board using Array.from to prevent shallow copy
const generateBoard = (rows: number, columns: number): IBoard => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};

export { formatBoard, isBoardWin, checkTile, attackTile, generateBoard };
