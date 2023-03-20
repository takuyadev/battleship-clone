import { useReducer } from "react";
import { ONOFF_ACTIONS } from "@data/actions";

const { ON, OFF, FLIP } = ONOFF_ACTIONS;

const reducer = (state: boolean, action: { type: string }) => {
  switch (action.type) {
    case ON:
      return true;
    case OFF:
      return false;
    case FLIP:
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
