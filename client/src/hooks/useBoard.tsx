import { useEffect, useReducer } from 'react';
import {
  generateBoard,
  updateTile,
  isTilePlaced,
  getSetBoard,
} from '@utils/index';
import { Coordinates, IBoard } from '@models/types';
import { ROWS, COLUMNS, MARKED_PLACED, MARKED_EMPTY } from '@data/constants';
import { BoardAction } from '@models/interfaces';

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
  const [state, dispatch] = useReducer(reducer, generateBoard(x, y));

  useEffect(() => {
    console.log(state);
  }, [state]);

  return [state, dispatch] as const;
};

export { useBoard };
