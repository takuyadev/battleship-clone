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
  PlayerTurnType,
  OpponentTurnType,
  PlayerAttackType,
  OpponentAttackType,
  DisableBoardType,
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
  name: string;
  height: number;
  isPlaced: boolean;
  isRotated: boolean;
  hitCount: number;
  coordinates: { x: number; y: number, isHit: boolean }[] | [];
}

export interface INewShip {
  name: string;
  height: number;
}

export interface IConfig {
  gameFormat: GameFormat;
  boardSize: number;
}

export interface IGameBoard {
  playerBoard: IBoard;
  setPlayerBoard: Dispatch<BoardAction>;
  opponentBoard: IBoard;
  setOpponentBoard: Dispatch<BoardAction>;
  playerShips: IShips[];
  setPlayerShips: Dispatch<ShipAction>;
  opponentShips: IShips[];
  setOpponentShips: Dispatch<ShipAction>;
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
  opponentBoard: IBoard;
  setOpponentBoard: Dispatch<BoardAction>;
  opponentShips: IShips[];
  setOpponentShips: Dispatch<ShipAction>;
  showBoard: boolean;
  setShowBoard: Dispatch<OnOffAction>;
  setConfig: Dispatch<SetStateAction<IConfig>>;
}

// ? Action Types
export type GameAction =
  | PlayerAttackAction
  | OpponentAttackAction
  | PlayerTurnAction
  | OpponentTurnAction
  | DisableBoardAction;

type PlayerAttackAction = {
  type: PlayerAttackType;
  payload: {
    coords: Coordinates;
  };
};

type OpponentAttackAction = {
  type: OpponentAttackType;
  payload: {
    coords: Coordinates;
  };
};

type PlayerTurnAction = {
  type: PlayerTurnType;
  payload: null;
};

type OpponentTurnAction = {
  type: OpponentTurnType;
  payload: null;
};

type DisableBoardAction = {
  type: DisableBoardType;
  payload: null;
};

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
  | RotateShipAction
  | UpdateHitCountAction;

type InitializeShipsAction = {
  type: initializeShipType;
  payload: null;
};

type UpdateHitCountAction = {
  type: 'update-hitcount';
  payload: {
    coords: Coordinates;
  };
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
