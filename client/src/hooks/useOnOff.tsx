import { useReducer } from 'react';
import { OnOffAction } from './models/types/types.onoff';
import { OnOffEnum } from './models/_index';

const reducer = (state: boolean, action: OnOffAction) => {
  switch (action.type) {
    case OnOffEnum.ON:
      return true;
    case OnOffEnum.OFF:
      return false;
    case OnOffEnum.FLIP:
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
