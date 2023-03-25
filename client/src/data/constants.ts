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

// A Carrier, which is 5 tiles long
// A Battleship, which is 4 tiles long
// A Cruiser, which is 3 tiles long
// A Submarine, which is 3 tiles long
// A Destroyer, which is 2 tiles long


export const SHIPS = [
  {
    name: 'Destroyer',
    height: 1,
  },
  {
    name: 'Submarine',
    height: 2,
  },
  {
    name: 'Cruiser',
    height: 3,
  },
  {
    name: 'Battleship',
    height: 4,
  },
  {
    name: 'Carrier',
    height: 5,
  },
];

export const TURN_DELAY = 3000;
