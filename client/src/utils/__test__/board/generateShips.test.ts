import { assert } from "chai";
import { describe, it } from "vitest";
import { generateShips } from "@utils/board/generateShips";
import * as data from "@data/defaults/piecesDefault.json";

describe("generateShips()", () => {
  it("should return default ship configuration", () => {
    const output = generateShips(5);
    assert.deepEqual(data.pieces, output);
  });
});
