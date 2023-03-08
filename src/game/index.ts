// 10 x 10 board

// The game board is 
  // Marked from A-J Columns
  // Marked from 1-10 on Rows
// 

// We can set the game up by saying:
  // -1 === Shot and out
  // 0 === nothing there
  // 1 === Still up and running

// Game starts when user requests a first render of the game

// The player is allowed to shoot once it's their turn
// The player can only shoot once per turn

// The game should log onto the page to show game progress
  // Whether it was a hit or miss
  // The location of the shot
  // Which player won

// The game is won if one of the players have successfully destroyed all the opponents ship 
  // In other words, if at least one player has won than the game is done

// Each player is allowed 5 pieces of ship that they can drop anywhere on the board
  // The ship is not allowed to overlap onto eachother
  // The ship cannot overflow the board
  // The ship has individual traits (height)

import Board, { IBoard, IBoard_Props } from "./class/Board";

export const startGame = (settings: IBoard_Props ): void => {
  const {columns, rows} = settings
  const playerBoard: IBoard = new Board({ columns, rows });
  const opponentBoard: IBoard = new Board({ columns, rows });
  
  console.log(playerBoard, opponentBoard)
};
