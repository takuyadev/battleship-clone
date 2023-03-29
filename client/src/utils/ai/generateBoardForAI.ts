// This will generate a board for assessing which
export const generateBoardForAI = (boardSize: number) => {
  const result = [];
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      result.push({ x, y });
    }
  }
  return result;
};
