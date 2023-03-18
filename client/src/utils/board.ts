import { IBoard } from "../models/types";

// If tile is already marked, then return false
const checkTile = (board: IBoard, x: number, y: number) => {
  if (board[x][y] === -1) {
    return false;
  }

  return true;
};

//Place ship should take the height of the ship in order to place on board
const checkPlaceable = (
  board: IBoard,
  x: number,
  y: number,
  options: {
    isRotate: boolean;
    height: number;
  }
) => {
  const { isRotate, height } = options;
  // If it is currently rotated, change condition algorithm
  const rotateCondition = isRotate ? height - 1 > y : height - 1 > x;

  if (rotateCondition) {
    return false;
  }

  // Logic for up to down
  if (!isRotate) {
    for (let i = x; i > x - height; i--) {
      if (board[i][y] === 1) {
        return false;
      }
    }
  }

  //Logic for left to right
  if (isRotate) {
    for (let i = y; i > y - height; i--) {
      if (board[x][i] === 1) {
        return false;
      }
    }
  }

  return true;
};

// const searchBoard = (
//   board: IBoard,
//   x: number,
//   y: number,
//   options: {
//     height: number;
//     isRotate: boolean;
//   },
//   callback: Function
// ) => {
//   let result = [...board]
//   const { height, isRotate } = options;

//   //Logic for left to right
//   if (isRotate) {
//     for (let i = y; i > y - height; i--) {
//     }
//     callback(board);
//   }

//   // Logic for up to down
//   if (!isRotate) {
//     for (let i = x; i > x - height; i--) {
//     }
//     callback(board);
//   }
// };

// This edits the board, and returns the edited board
const editBoard = (
  board: IBoard,
  x: number,
  y: number,
  options: {
    height: number;
    isRotate: boolean;
    isRemove: boolean;
  }
) => {
  const { height, isRotate, isRemove } = options;

  // Set tile determines if to remove ship
  let setTile = isRemove ? 0 : 1;
  let placedBoard = [...board];

  // Logic for up to down
  if (!isRotate) {
    for (let i = x; i > x - height; i--) {
      placedBoard[i][y] = setTile;
    }
    return placedBoard;
  }

  //Logic for left to right
  if (isRotate) {
    for (let i = y; i > y - height; i--) {
      placedBoard[x][i] = setTile;
    }
    return placedBoard;
  }

  return board;
};

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

export {
  formatBoard,
  editBoard,
  isBoardWin,
  checkTile,
  attackTile,
  generateBoard,
  checkPlaceable
};
