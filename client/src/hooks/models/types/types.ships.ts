import { Coordinate } from '@models/types.common';
import { ShipsEnum } from '../_index';

export type ShipAction =
  | InitializeShipsAction
  | UpdatePlacedAction
  | UpdateCoordinatesAction
  | RotateShipAction
  | UpdateHitCountAction;

// Dispatches
type InitializeShipsAction = {
  type: ShipsEnum.INITIALIZE_SHIPS
  payload: null;
};

type UpdateHitCountAction = {
  type: ShipsEnum.UPDATE_HITCOUNT;
  payload: {
    coords: Coordinate;
  };
};

type UpdatePlacedAction = {
  type: ShipsEnum.UPDATE_PLACED;
  payload: {
    height: number;
  };
};

type UpdateCoordinatesAction = {
  type: ShipsEnum.UPDATE_COORDINATES;
  payload: {
    height: number;
    coords: Coordinate;
  };
};

type RotateShipAction = {
  type: ShipsEnum.ROTATE_SHIP;
  payload: { height: number; isRotated: boolean };
};

// Action Type
export type UpdatePlacedType = 'update-placed';
export type UpdateHitCountType = 'update-hitcount';
export type UpdateCoordinatesType = 'update-coordinates';
export type initializeShipType = 'initialize-ships';
export type RotateShipType = 'rotate-ship';
