// Only shows marked tiles
const showBoard = (board: number[][], isShow: boolean) => {
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
const markTile = (board: number[][], x: number, y: number) => {
  // If ship was on tile, and got marked
  if (board[x][y] === 1) {
    board[x][y] = -2;
  }

  // Else, mark normally
  board[x][y] = -1;
  return board;
};

// Generate board using Array.from to prevent shallow copy
const generateBoard = (rows: number, columns: number) => {
  return Array.from({ length: columns }, () => Array(rows).fill(0));
};

export { showBoard, markTile, generateBoard };
