import { assert } from 'chai';
import { describe, it } from 'vitest';
import { generateShips } from '@utils/board/generateShips';
import * as data from '@data/defaults/piecesDefault.json';
import { BoardSize } from '@models/enum.common';
import { SHIPS } from '@data/constants';

describe('generateShips()', () => {
  it('should return default ship configuration', () => {
    const output = generateShips(SHIPS);
    assert.deepEqual(data.pieces, output);
  });
});
