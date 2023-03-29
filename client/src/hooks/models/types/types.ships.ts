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
    id: number;
  };
};

type UpdateCoordinatesAction = {
  type: ShipsEnum.UPDATE_COORDINATES;
  payload: {
    id: number;
    coords: Coordinate;
  };
};

type RotateShipAction = {
  type: ShipsEnum.ROTATE_SHIP;
  payload: { id: number; isRotated: boolean };
};

// Action Type
export type UpdatePlacedType = 'update-placed';
export type UpdateHitCountType = 'update-hitcount';
export type UpdateCoordinatesType = 'update-coordinates';
export type initializeShipType = 'initialize-ships';
export type RotateShipType = 'rotate-ship';
