import { Coordinate } from '@models/types.common';
import { BoardOption } from '@models/types.common';
import { BoardEnum } from '../enum/enum.board';

export type BoardAction =
  | AddShipAction
  | RemoveShipAction
  | UpdateTileAction
  | InitializeBoardAction
  | AttackTileAction;

// Action types
type AddShipAction = {
  type: BoardEnum.ADD_SHIP;
  payload: {
    coords: Coordinate;
    options: BoardOption;
  };
};

type RemoveShipAction = {
  type: BoardEnum.REMOVE_SHIP;
  payload: {
    coords: Coordinate;
    options: BoardOption;
  };
};

type UpdateTileAction = {
  type: BoardEnum.UPDATE_TILE;
  payload: {
    coords: Coordinate;
    mark: number;
  };
};

type AttackTileAction = {
  type: BoardEnum.ATTACK_TILE;
  payload: {
    coords: Coordinate;
  };
};

type InitializeBoardAction = {
  type: BoardEnum.INITIALIZE_BOARD;
  payload: {
    boardSize: number;
  };
};
