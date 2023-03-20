import { useReducer } from "react";
import { BOOLEAN_ACTION } from "@data/actions";

const { ON, OFF } = BOOLEAN_ACTION;

const reducer = (state: boolean, action: { type: string }) => {
  switch (action.type) {
    case ON:
      return true;
    case OFF:
      return false;
    default:
      return state;
  }
};

const useOnOff = (initialValue: boolean) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return [state, dispatch];
};

export { useOnOff };
