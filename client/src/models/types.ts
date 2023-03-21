// Configurations
export type IBoard = number[][];
export type Coordinates = { x: number; y: number };
export type BoardOptions = {
  height: number;
  isRotate: boolean;
  isRemove?: boolean;
};

// onOff Hooks
export type OnType = 'on';
export type OffType = 'off';
export type FlipType = 'flip';

// board Hooks
export type UpdateTileType = 'update-tile';
export type AttackTileType = 'attack-tile';
export type PlaceShipType = 'place-ship';
export type InitializeBoardType = 'initialize-board';
export type UpdateBoardType = 'update-board';

// ship Hooks
export type UpdateShipType = 'update-placed';
export type initializeShipType = 'initialize-ships';
