import { Ships } from "@models/types.common";

// Checks if all ships have already been placed
export const isAllShipsPlaced = (ships: Ships) => {
  for (const ship of ships) {
    if (!ship.isPlaced) {
      return false;
    }
  }
  return true;
};
