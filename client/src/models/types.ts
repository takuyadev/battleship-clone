// Configurations
export type IBoard = number[][];
export type Coordinates = { x: number; y: number };
export type BoardOptions = {
  height: number;
  isRotated?: boolean;
  isRemove?: boolean;
};

// onOff Hooks
export type OnType = 'on';
export type OffType = 'off';
export type FlipType = 'flip';

// board Hooks
export type UpdateTileType = 'update-tile';
export type AttackTileType = 'attack-tile';
export type AddShipType = 'add-ship';
export type RemoveShipType = 'remove-ship';
export type InitializeBoardType = 'initialize-board';
export type UpdateBoardType = 'update-board';
export type RotateBoardType = 'rotate-board';


// ship Hooks
export type UpdatePlacedType = 'update-placed';
export type UpdateCoordinatesType = 'update-coordinates'
export type initializeShipType = 'initialize-ships';
export type RotateShipType = 'rotate-ship';
