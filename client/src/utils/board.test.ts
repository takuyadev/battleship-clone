import { assert } from "chai";
import { describe, it } from "vitest";
import { hideShips, isShipPlaceable } from "./board";
import {
  EMPTY_BOARD,
  SET_BOARD,
  ATTACKED_BOARD,
  HIDDEN_BOARD,
} from "./constants/board";

describe("hideShips()", () => {
  it("should hide ships on the board", () => {
    const board = hideShips(SET_BOARD);
    assert.deepEqual(EMPTY_BOARD, board);
  });

  it("should hide not hide attacked ships on the board", () => {
    const board = hideShips(ATTACKED_BOARD);
    assert.deepEqual(HIDDEN_BOARD, board);
  });
});

describe("isShipPlaceable()", () => {
  it("should return true if the ship has enough space on the x axis", () => {
    const coords = { x: 7, y: 0 };
    const height = 5;
    const condition = isShipPlaceable(coords, { isRotate: false, height });
    assert.isTrue(condition);
  });

  it("should return true if the ship has enough space on the y axis", () => {
    const coords = { x: 0, y: 7 };
    const height = 5;
    const condition = isShipPlaceable(coords, { isRotate: true, height });
    assert.isTrue(condition);
  });

  it("should return false if the ship goes overflows passed the x axis", () => {
    const coords = { x: 3, y: 0 };
    const height = 5;
    const condition = isShipPlaceable(coords, { isRotate: false, height });
    assert.isFalse(condition);
  });

  it("should return false if the ship goes overflows passed the y axis", () => {
    const coords = { x: 0, y: 3 };
    const height = 5;
    const condition = isShipPlaceable(coords, { isRotate: true, height });
    assert.isFalse(condition);
  });
});
