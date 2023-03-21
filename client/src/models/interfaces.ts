import {
  IBoard,
  initializeShipType,
  UpdateCoordinatesType,
  UpdatePlacedType,
} from './types';
import {
  PlaceShipType,
  UpdateTileType,
  AttackTileType,
  Coordinates,
  BoardOptions,
  InitializeBoardType,
} from './types';

// General interfaces
export interface IGame {
  player: IPlayer;
  opponent: IPlayer;
}

export interface IPlayer {
  username: string;
  board: IBoard;
}

export interface IPieces {
  height: number;
  isPlaced: boolean;
  coordinates: { x: number; y: number };
}

// ? Action Types
// useReducers action types
export type BoardAction =
  | PlaceShipAction
  | UpdateTileAction
  | InitializeBoardAction
  | AttackTileAction;

type PlaceShipAction = {
  type: PlaceShipType;
  payload: {
    coords: Coordinates;
    options: BoardOptions;
  };
};

type UpdateTileAction = {
  type: UpdateTileType;
  payload: {
    coords: Coordinates;
    mark: number;
  };
};

type AttackTileAction = {
  type: AttackTileType;
  payload: {
    coords: Coordinates;
    mark: number;
  };
};

type InitializeBoardAction = {
  type: InitializeBoardType;
  payload: null;
};

export type ShipAction = InitializeShipsAction | UpdatePlacedAction;

type InitializeShipsAction = {
  type: initializeShipType;
  payload: null;
};

type UpdatePlacedAction = {
  type: UpdatePlacedType;
  payload: {
    height: number;
  };
};

type UpdateCoordinatesAction = {
  type: UpdateCoordinatesType;
  payload: {
    height: number;
    coords: Coordinates;
  };
};
