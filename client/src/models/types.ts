import { IPieces } from "./interfaces";

export type BoardOptions = {
  height: number;
  isRotate: boolean;
  isRemove?: boolean;
};


export type BoardActionType = {
  type: string;
  payload: { coords: { x: number; y: number }; mark: number };
};


export type IBoard = number[][];
export type Coordinates = { x: number; y: number };
export type AttackTile = (x: number, y: number) => void;
export type InitializeBoard = () => void;
export type DisplayBoard = (player: PlayerSelection, isShow: boolean) => IBoard;
export type PlayerSelection = "player" | "opponent";
export type UpdateBoard = (board: IBoard, player: PlayerSelection) => void;
export type Messages = string[];
export type PlaceShip = (
  board: IBoard,
  pieces: IPieces[],
  x: number,
  y: number,
  options: {
    height: number;
    isRotate: boolean;
  }
) => void;
export type GetEditedBoard = (
  board: IBoard,
  x: number,
  y: number,
  options: {
    height: number;
    isRotate: boolean;
    isRemove: boolean;
  }
) => IBoard;
