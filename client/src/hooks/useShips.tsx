import { useReducer } from 'react';
import { generateShips } from '@utils/board/generateShips';
import { generateCoordinates } from '@utils/board/generateCoordinates';
import { updateShipByCoords } from '@utils/board/updateShipByCoords';
import { ShipAction } from './models/types/types.ships';
import { Ships } from '@models/types.common';
import { SHIPS, SHIPS_COUNT } from '@data/constants';
import { ShipsEnum } from './models/_index';

const reducer = (state: Ships, { type, payload }: ShipAction) => {
  switch (type) {
    case ShipsEnum.INITIALIZE_SHIPS:
      return generateShips(SHIPS, SHIPS_COUNT);

    case ShipsEnum.UPDATE_PLACED:
      state[payload.height - 1].isPlaced = true;
      return state;

    case ShipsEnum.UPDATE_COORDINATES:
      const { height, coords } = payload;
      const newCoords = generateCoordinates(
        height,
        state[payload.height - 1].isRotated,
        coords
      );
      state[payload.height - 1].coords = [...newCoords];
      return state;

    case ShipsEnum.UPDATE_HITCOUNT:
      const newState = updateShipByCoords(state, payload.coords);
      return newState;

    case ShipsEnum.ROTATE_SHIP:
      state[payload.height - 1].isRotated = payload.isRotated;
      return state;

    default:
      return state;
  }
};

const useShips = () => {
  const [state, dispatch] = useReducer(
    reducer,
    generateShips(SHIPS, SHIPS_COUNT)
  );

  return [state, dispatch] as const;
};

export { useShips };
