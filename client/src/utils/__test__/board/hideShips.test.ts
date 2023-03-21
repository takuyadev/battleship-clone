import { assert } from "chai";
import { describe, it } from "vitest";
import { hideShips } from "@utils/index";
import * as data from "@data/defaults/boardDefault.json";

const { EMPTY_BOARD, ATTACKED_BOARD, HIDDEN_BOARD, SET_BOARD } = data;

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
