import { useReducer } from 'react';
import {
  generateBoard,
  updateTile,
  isTilePlaced,
  getSetBoard,
} from '@utils/index';
import { Coordinates, IBoard } from '@models/types';
import { MARKED_PLACED, MARKED_EMPTY } from '@data/constants';
import { BoardAction } from '@models/interfaces';
import { rotateBoard } from '@utils/board/rotateBoard';

const reducer = (state: IBoard, { type, payload }: BoardAction) => {
  switch (type) {
    // Restart board
    case 'initialize-board':
      return generateBoard(payload.boardSize, payload.boardSize);

    // Place ship based on location, and options (height) provided
    case 'remove-ship':
      const removedBoard = getSetBoard(state, payload.coords, {
        ...payload.options,
        isRemove: true,
      });

      return removedBoard;

    case 'add-ship':
      const addedBoard = getSetBoard(state, payload.coords, {
        ...payload.options,
        isRemove: false,
      });
      return addedBoard;

    case 'rotate-board':
      return rotateBoard(state);

    // Update tile based on coordinates provided and mark you want to add
    case 'update-tile':
      return updateTile(state, payload.coords, payload.mark);

    // Attack selected player board's tile
    case 'attack-tile':
      const tile = [payload.coords.x][payload.coords.y];

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

const useBoard = ({ x, y }: Coordinates) => {
  const [board, dispatch] = useReducer(reducer, generateBoard(x, y));

  return [board, dispatch] as const;
};

export { useBoard };
