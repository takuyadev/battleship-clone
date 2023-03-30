import { Board, Coordinate, SetBoard, SetShips, Ships } from '@models/_index';
import { GameEnum } from '../enum/enum.game';

export type PlayerGameState = {
  name: string;
  board: Board;
  ships: Ships;
  setShips: SetShips;
  setBoard: SetBoard;
  isTurn: boolean;
  isHide: boolean;
};

export type GameAction =
  | PlayerAttackAction
  | OpponentAttackAction
  | PlayerTurnAction
  | OpponentTurnAction
  | DisableBoardAction
  | HideBoardsAction
  | ShowBoardsAction
  | UpdateOpponentNameAction
  | UpdatePlayerNameAction;

type PlayerAttackAction = {
  type: GameEnum.PLAYER_ATTACK;
  payload: {
    coords: Coordinate;
  };
};

type OpponentAttackAction = {
  type: GameEnum.OPPONENT_ATTACK;
  payload: {
    coords: Coordinate;
  };
};

type PlayerTurnAction = {
  type: GameEnum.PLAYER_TURN;
  payload: null;
};

type OpponentTurnAction = {
  type: GameEnum.OPPONENT_TURN;
  payload: null;
};

type DisableBoardAction = {
  type: GameEnum.DISABLE_BOARD;
  payload: null;
};

type HideBoardsAction = {
  type: GameEnum.HIDE_BOARDS;
  payload: null;
};

type ShowBoardsAction = {
  type: GameEnum.SHOW_BOARDS;
  payload: null;
};

type UpdatePlayerNameAction = {
  type: GameEnum.UPDATE_PLAYER_NAME;
  payload: {
    name: string;
    coords: Coordinate;
  };
};

type UpdateOpponentNameAction = {
  type: GameEnum.UPDATE_OPPONENT_NAME;
  payload: {
    name: string;
    coords: Coordinate;
  };
};
