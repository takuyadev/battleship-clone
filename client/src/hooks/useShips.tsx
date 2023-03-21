import { useEffect, useReducer } from 'react';
import { generateShips } from '@utils/board/generateShips';
import { IShips, ShipAction } from '@models/interfaces';
import { SHIPS_COUNT } from '@data/constants';

const reducer = (state: IShips[], { type, payload }: ShipAction) => {
  let index = 0;

  if (payload?.height) {
    index = payload.height - 1;
  }

  switch (type) {
    case 'initialize-ships':
      return generateShips(SHIPS_COUNT);

    case 'update-placed':
      state[index].isPlaced = true;
      return state;

    case 'update-coordinates':
      state[index].coordinates = payload.coords;
      return state;

    case 'rotate-ship':
      state[index].isRotated = payload.isRotated;
      return state;

    default:
      return state;
  }
};

const useShips = () => {
  const [state, dispatch] = useReducer(reducer, generateShips(SHIPS_COUNT));

  return [state, dispatch] as const;
};

export { useShips };
