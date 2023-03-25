import { Coordinate, SetBoard, SetShips } from '@models/_index';
import { GameEnum } from '../enum/enum.game';

export type PlayerGameState = {
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
  | DisableBoardAction;

type PlayerAttackAction = {
  type: GameEnum.PLAYER_ATTACK
  payload: {
    coords: Coordinate;
  };
};

type OpponentAttackAction = {
  type:  GameEnum.OPPONENT_ATTACK;
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
