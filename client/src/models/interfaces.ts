import { Dispatch, SetStateAction } from 'react';

import {
  AddShipType,
  IBoard,
  initializeShipType,
  RemoveShipType,
  UpdateCoordinatesType,
  UpdatePlacedType,
  RotateBoardType,
  UpdateTileType,
  AttackTileType,
  Coordinates,
  BoardOptions,
  InitializeBoardType,
  RotateShipType,
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

export interface IShips {
  height: number;
  isPlaced: boolean;
  isRotated: boolean;
  coordinates: { x: number; y: number };
}

export interface IConfig {
  gameFormat: GameFormat;
  boardSize: number;
}

export type GameFormat = 'local' | 'online' | 'computer' | string;

// Context
export interface IGameContext {
  config: {
    gameFormat: GameFormat;
    boardSize: number;
  };
  playerBoard: IBoard;
  setPlayerBoard: Dispatch<BoardAction>;
  playerShips: IShips[];
  setPlayerShips: Dispatch<ShipAction>;
  showBoard: boolean;
  setShowBoard: Dispatch<OnOffAction>;
  setConfig: Dispatch<SetStateAction<IConfig>>;
}

// ? Action Types
// useReducers action types

export type OnOffAction = {
  type: OnOffActionTypes;
};

type OnOffActionTypes = 'on' | 'off' | 'flip';

export type BoardAction =
  | AddShipAction
  | RemoveShipAction
  | UpdateTileAction
  | InitializeBoardAction
  | AttackTileAction
  | RotateBoardAction;

type AddShipAction = {
  type: AddShipType;
  payload: {
    coords: Coordinates;
    options: BoardOptions;
  };
};

type RemoveShipAction = {
  type: RemoveShipType;
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
  payload: {
    boardSize: number;
  };
};

type RotateBoardAction = {
  type: RotateBoardType;
  payload: null;
};

export type ShipAction =
  | InitializeShipsAction
  | UpdatePlacedAction
  | UpdateCoordinatesAction
  | RotateShipAction;

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

type RotateShipAction = {
  type: RotateShipType;
  payload: { height: number; isRotated: boolean };
};
