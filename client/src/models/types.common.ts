import { Dispatch } from 'react';
import { GameFormat } from './enum.common';
import { BoardAction } from '@hooks/models/types/types.board';
import { ShipAction } from '@hooks/models/types/types.ships';

// Game related types
export type Game = {
  player: Player;
  opponent: Player;
};

export type Player = {
  board: Board;
  ships: Ships;
  setBoard: Dispatch<BoardAction>;
  setShips: Dispatch<ShipAction>;
};

export type PlayerState = {
  board: Board;
  ships: Ships;
  setBoard: Dispatch<BoardAction>;
  setShips: Dispatch<ShipAction>;
};

export type Config = {
  gameFormat: GameFormat;
  boardSize: number;
};

export type SetBoard = Dispatch<BoardAction>;
export type SetShips = Dispatch<ShipAction>;

// Ship related types
export type Ship = {
  name: string;
  height: number;
  isPlaced: boolean;
  isRotated: boolean;
  hitCount: number;
  coords: Attack[] | [];
};

export type Ships = Ship[];
export interface NewShip {
  name: string;
  height: number;
}

// Board related types
export type Board = number[][];
export type Message = {
  icon: React.ReactNode;
  message: string;
};;
export type Messages = Message[]
export type Attack = { coords: Coordinate; isHit: boolean };
export type Coordinate = { x: number; y: number };
export type Coordinates = Coordinate[];
export type BoardOption = {
  height: number;
  isRotated?: boolean;
  isRemove?: boolean;
};
