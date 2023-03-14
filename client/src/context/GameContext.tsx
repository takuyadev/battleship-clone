import { useState, createContext } from "react";
import { IBoard } from "../interfaces/IBoard";
import { generateBoard, markTile } from "../utils/board";

// Context Typing
interface IGameContext {
  boards: IBoard;
  updateTile: (player: "player" | "opponent", x: number, y: number) => void;
  initializeBoard: () => void;
}

const GameContext = createContext<IGameContext>({});

// Default player data
const PLAYER_DATA = {
  player: {
    username: "",
    board: [],
  },
  opponent: {
    username: "",
    board: [],
  },
};

// Set provider for game
const GameContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [boards, setBoards] = useState<IBoard>(PLAYER_DATA);

  // Updates the specific tile targetted by the player
  const updateTile = (player: "player" | "opponent", x: number, y: number) => {
    if (!boards) {
      return;
    }

    const playerBoard = markTile(boards[player].board, x, y);
    setBoards((prev) => ({ ...prev, [player]: { ...prev[player], board: playerBoard } }));
  };

  // Initializes the board with a 10x10 grid
  const initializeBoard = () => {
    setBoards({
      player: {
        username: "Player 1",
        board: generateBoard(10, 10),
      },
      opponent: {
        username: "Player 2",
        board: generateBoard(10, 10),
      },
    });
  };

  return <GameContext.Provider value={{ boards, updateTile, initializeBoard }}>{children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
