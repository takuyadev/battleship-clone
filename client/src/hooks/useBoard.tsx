import { useEffect, useReducer } from "react";
import { generateBoard, updateTile, isTilePlaced } from "@utils/index";
import { IBoard } from "@models/types";
import { TILE } from "@data/constants";
import { BOARD_ACTIONS } from "@data/actions";

const { MARKED_PLACED, MARKED_EMPTY } = TILE;
const { UPDATE_TILE, ATTACK_TILE, INITIALIZE_BOARD } = BOARD_ACTIONS;

const reducer = (state: IBoard, action) => {
  const { x, y } = action.payload;

  switch (action.type) {
    case INITIALIZE_BOARD:
      return generateBoard(10, 10);

    case UPDATE_TILE:
      return updateTile(state, { x, y }, action.payload.mark);

    case ATTACK_TILE:
      const mark = isTilePlaced(state, { x, y }) ? MARKED_PLACED : MARKED_EMPTY;
      return updateTile(state, { x, y }, mark);

    default:
      return state;
  }
};

const useBoard = ({ x, y }: { x: number; y: number }) => {
  const [state, dispatch]: [IBoard, React.Dispatch<any>] = useReducer(reducer, generateBoard(x, y));

  useEffect(() => {
    console.log("Board updated!");
    console.log(state)
  }, [state]);

  return [state, dispatch];
};

export { useBoard };
