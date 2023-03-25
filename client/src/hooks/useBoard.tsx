import { useReducer } from 'react';
import {
  generateBoard,
  updateTile,
  isTilePlaced,
  getSetBoard,
} from '@utils/index';
import { Coordinate } from '@models/types.common';
import { MARKED_PLACED, MARKED_EMPTY } from '@data/constants';
import { rotateBoard } from '@utils/board/rotateBoard';
import { BoardAction, BoardEnum } from './models/_index';
import { Board } from '@models/types.common';

const reducer = (state: Board, { type, payload }: BoardAction) => {
  switch (type) {
    // Restart board
    case BoardEnum.INITIALIZE_BOARD:
      return generateBoard(payload.boardSize, payload.boardSize);

    // Place ship based on location, and options (height) provided
    case BoardEnum.REMOVE_SHIP:
      const removedBoard = getSetBoard(state, payload.coords, {
        ...payload.options,
        isRemove: true,
      });

      return removedBoard;

    case BoardEnum.ADD_SHIP:
      const addedBoard = getSetBoard(state, payload.coords, {
        ...payload.options,
        isRemove: false,
      });
      return addedBoard;

    case BoardEnum.ROTATE_BOARD:
      return rotateBoard(state);

    // Update tile based on coordinates provided and mark you want to add
    case BoardEnum.UPDATE_TILE:
      return updateTile(state, payload.coords, payload.mark);

    // Attack selected player board's tile
    case BoardEnum.ATTACK_TILE:
      const tile = state[payload.coords.x][payload.coords.y];

      // If ship is already attacked, then don't change
      if (tile === MARKED_PLACED || tile === MARKED_EMPTY) {
        return state;
      }

      // If above check passes, check if tile has ship on it
      const hitTile = isTilePlaced(state, payload.coords)
        ? MARKED_PLACED
        : MARKED_EMPTY;

      return updateTile(state, payload.coords, hitTile);

    // Else, return default state
    default:
      return state;
  }
};

const useBoard = ({ x, y }: Coordinate) => {
  const [board, dispatch] = useReducer(reducer, generateBoard(x, y));

  return [board, dispatch] as const;
};

export { useBoard };
