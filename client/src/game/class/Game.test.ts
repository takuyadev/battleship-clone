import { describe, expect, it } from "vitest";
import { assert } from "chai";

// Dummy Player Data
import { IBoard } from "./Board";
import BOARD_DATA from "../data/board_data.json";
const [player1, player2] = BOARD_DATA.player;

import Game from "./Game";
import Board from "./Board";

describe("example test", () => {
  it("should update single tile based on coordinates provided", () => {
    const playerData: IBoard = new Board(player1);
    const opponentData: IBoard = new Board(player2);

    const game = new Game({ playerData, opponentData });
    assert 
  });
});
