import { Ships } from "@models/types.common";

export const isAllShipsPlaced = (ships: Ships) => {
  for (const ship of ships) {
    if (!ship.isPlaced) {
      return false;
    }
  }
  return true;
};
