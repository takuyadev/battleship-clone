import { IPieces } from "@models/interfaces";

export const generateShips = (count: number): IPieces[] => {
  return new Array(count).fill(0).map((_item, i) => ({
    height: i + 1,
    isPlaced: false,
    coordinates: {
      x: -1,
      y: -1,
    },
  }));
};
