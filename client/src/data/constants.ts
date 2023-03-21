const TILE = {
  PLACED: 1,
  EMPTY: 0,
  MARKED_EMPTY: -1,
  MARKED_PLACED: -2,
};

export const { PLACED, EMPTY, MARKED_EMPTY, MARKED_PLACED } = TILE;
export const SHIPS_COUNT = 5;

const BOARD_SIZE = {
  ROWS: 10,
  COLUMNS: 10,
};
export const { ROWS, COLUMNS } = BOARD_SIZE;

const SHIPS = {
  S: {
    height: 1,
  },
  M: {
    height: 2,
  },
  L: {
    height: 3,
  },
  XL: {
    height: 4,
  },
  XXL: {
    height: 5,
  },
};
export const { S, M, L, XL, XXL } = SHIPS;
