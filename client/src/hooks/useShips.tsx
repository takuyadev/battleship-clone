import { useReducer } from 'react';
import { generateShips } from '@utils/board/generateShips';
import { IShips, ShipAction } from '@models/interfaces';
import { SHIPS, SHIPS_COUNT } from '@data/constants';
import { generateCoordinates } from '@utils/board/generateCoordinates';
import { updateShipByCoords } from '@utils/board/updateShipByCoords';
import { isTilePlaced } from '@utils/index';

const reducer = (state: IShips[], { type, payload }: ShipAction) => {
  // Payload height - 1 === currentIndex

  switch (type) {
    case 'initialize-ships':
      return generateShips(SHIPS, SHIPS_COUNT);

    case 'update-placed':
      state[payload.height - 1].isPlaced = true;
      return state;

    case 'update-coordinates':
      const { height, coords } = payload;
      const newCoords = generateCoordinates(
        height,
        state[payload.height - 1].isRotated,
        coords
      );
      state[payload.height - 1].coordinates = [...newCoords];
      return state;

    case 'update-hitcount':
      const newState = updateShipByCoords(state, payload.coords);
      console.log("new", newState)
      return newState;

    case 'rotate-ship':
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
