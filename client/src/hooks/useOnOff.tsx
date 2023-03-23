import { OnOffAction } from '@models/interfaces';
import { useReducer } from 'react';

const reducer = (state: boolean, action: OnOffAction) => {
  switch (action.type) {
    case 'on':
      return true;
    case 'off':
      return false;
    case 'flip':
      return !state;
    default:
      return state;
  }
};

const useOnOff = (initialValue: boolean) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return [state, dispatch] as const;
};

export { useOnOff };
