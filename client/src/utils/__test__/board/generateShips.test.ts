import { assert } from 'chai';
import { describe, it } from 'vitest';
import { generateShips } from '@utils/board/generateShips';
import * as data from '@data/defaults/piecesDefault.json';
import { BoardSize } from '@models/enum.common';

describe('generateShips()', () => {
  it('should return default ship configuration', () => {
    const output = generateShips(BoardSize.XL, BoardSize.XL);
    assert.deepEqual(data.pieces, output);
  });
});
