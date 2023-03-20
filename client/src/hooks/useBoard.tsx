import { useEffect, useReducer, useState } from "react";
import { generateBoard, updateTile, isTilePlaced } from "@utils/index";
import { Coordinates, IBoard, BoardActionType } from "@models/types";
import { TILE } from "@data/constants";
import { BOARD_ACTIONS } from "@data/actions";

const { MARKED_PLACED, MARKED_EMPTY } = TILE;
const { UPDATE_TILE, ATTACK_TILE, INITIALIZE_BOARD } = BOARD_ACTIONS;

const reducer = (state: IBoard, action: BoardActionType) => {
  const { x, y } = action.payload.coords;
  const { mark } = action.payload;

  switch (action.type) {
    case INITIALIZE_BOARD:
      return generateBoard(10, 10);

    case UPDATE_TILE:
      return updateTile(state, { x, y }, mark);

    case ATTACK_TILE:
      // If ship is already attacked, then don't change
      if (state[x][y] === MARKED_PLACED || state[x][y] === MARKED_EMPTY) {
        return state;
      }

      // If above check passes, check if tile has ship on it
      const hitTile = isTilePlaced(state, { x, y })
        ? MARKED_PLACED
        : MARKED_EMPTY;


      return updateTile(state, { x, y }, hitTile);

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
