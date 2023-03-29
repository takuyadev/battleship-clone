// Board Imports
import { updateShipOnBoard } from './board/updateShipOnBoard';
import { generateBoard } from './board/generateBoard';
import { isBoardLose } from './board/isBoardLose';
import { hideShips } from './board/hideShips';
import { isShipInBoard } from './board/isShipInBoard';
import { createMessages } from './board/createMessages';

// Ship Imports
import { generateCoordinates } from './ships/generateCoordinates';
import { generateShips } from './ships/generateShips';
import { isAllShipsPlaced } from './ships/isAllShipsPlaced';
import { findShipWithCoords } from './ships/findShipWithCoords';
import { isTilePlaced } from './ships/isTilePlaced';
import { updateShipByCoords } from './ships/updateShipByCoords';
import { updateTile } from './ships/updateTile';

// AI Imports
import { generateBoardForAI } from './ai/generateBoardForAI';
import { selectMove } from './ai/selectMove';

// Game
export {
  isAllShipsPlaced,
  isBoardLose,
  updateTile,
  isTilePlaced,
  updateShipOnBoard,
  generateBoard,
  hideShips,
  isShipInBoard,
  selectMove,
  createMessages,
  findShipWithCoords,
  generateShips,
  updateShipByCoords,
  generateCoordinates,
  generateBoardForAI,
};
