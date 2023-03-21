import { useEffect, useReducer } from 'react';
import {
  generateBoard,
  updateTile,
  isTilePlaced,
  getSetBoard,
} from '@utils/index';
import {
  Coordinates,
  IBoard,
  InitializeBoardType,
  PlaceShipType,
  UpdateTileType,
  AttackTileType,
} from '@models/types';
import { ROWS, COLUMNS, MARKED_PLACED, MARKED_EMPTY } from '@data/constants';
import { BoardOptions } from '@models/types';

type PlaceShipAction = {
  type: PlaceShipType;
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
  payload: null;
};

type BoardAction =
  | PlaceShipAction
  | UpdateTileAction
  | InitializeBoardAction
  | AttackTileAction;

const reducer = (state: IBoard, { type, payload }: BoardAction) => {
  switch (type) {
    // Restart board
    case 'initialize-board':
      return generateBoard(ROWS, COLUMNS);

    // Place ship based on location, and options (height) provided
    case 'place-ship':
      const updatedBoard = getSetBoard(state, payload.coords, payload.options);
      return updatedBoard;

    // Update tile based on coordinates provided and mark you want to add
    case 'update-tile':
      return updateTile(state, { x: payload.x, y: payload.y }, payload.mark);

    // Attack selected player board's tile
    case 'attack-tile':
      const tile = [payload.x][payload.y];

      // If ship is already attacked, then don't change
      if (tile === MARKED_PLACED || tile === MARKED_EMPTY) {
        return state;
      }

      // If above check passes, check if tile has ship on it
      const hitTile = isTilePlaced(state, { x: payload.x, y: payload.y })
        ? MARKED_PLACED
        : MARKED_EMPTY;

      return updateTile(state, { x: payload.x, y: payload.y }, hitTile);

    // Else, return default state
    default:
      return state;
  }
};

const useBoard = ({ x, y }: Coordinates) => {
  const [state, dispatch] = useReducer(reducer, generateBoard(x, y));

  useEffect(() => {
    console.log(state);
  }, [state]);

  return [state, dispatch] as const;
};

export { useBoard };
