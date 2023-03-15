export type IBoard = number[][];
export type AttackTile = (x: number, y: number) => void;
export type InitializeBoard = () => void;
export type DisplayBoard = (player: PlayerSelection, isShow: boolean) => IBoard;
export type PlayerSelection = "player" | "opponent";
export type UpdateBoard = (board: IBoard, player: PlayerSelection) => void;
export type Messages = string[]