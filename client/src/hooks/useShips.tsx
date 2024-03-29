import { useReducer } from 'react';
import {
  generateShips,
  updateShipByCoords,
  generateCoordinates,
} from '@utils/_index';
import { ShipsEnum, ShipAction } from './models/_index';
import { SHIPS } from '@data/constants';
import { Ships } from '@models/types.common';

const reducer = (state: Ships, { type, payload }: ShipAction) => {
  switch (type) {
    case ShipsEnum.INITIALIZE_SHIPS:
      return generateShips(SHIPS);

    case ShipsEnum.UPDATE_PLACED:
      state[payload.id].isPlaced = true;
      return state;

    case ShipsEnum.UPDATE_COORDINATES:
      const { id, coords } = payload;
      const newCoords = generateCoordinates(
        state[id].height,
        state[id].isRotated,
        coords
      );
      state[id].coords = [...newCoords];
      return state;

    case ShipsEnum.UPDATE_HITCOUNT:
      const newState = updateShipByCoords(state, payload.coords);
      return newState;

    case ShipsEnum.ROTATE_SHIP:
      state[payload.id].isRotated = payload.isRotated;
      return state;

    default:
      return state;
  }
};

const useShips = () => {
  const [state, dispatch] = useReducer(reducer, generateShips(SHIPS));

  return [state, dispatch] as const;
};

export { useShips };
