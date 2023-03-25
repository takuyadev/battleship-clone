export enum BoardSize {
  XS = 6,
  S = 7,
  M = 8,
  L = 9,
  XL = 10,
}

export enum GameFormat {
  LOCAL = 'local',
  ONLINE = 'online',
  COMPUTER = 'computer',
}

export enum Mark {
  PLACED = 1,
  EMPTY = 0,
  MARKED_EMPTY = -1,
  MARKED_PLACED = -2,
}