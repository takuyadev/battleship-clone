import { useState, createContext } from "react";
import { IBoard } from "../interfaces/IBoard";
import { generateBoard, markTile } from "../utils/board";

const GameContext = createContext({});

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

    if (player === "player") {
      const playerBoard = markTile(boards[player].board, x, y);
      setBoards((prev) => ({ ...prev, player: { username: prev.player.username, board: playerBoard } }));
    }

    if (player === "opponent") {
      const opponentBoard = markTile(boards[player].board, x, y);
      setBoards((prev) => ({ ...prev, opponent: { username: prev.opponent.username, board: opponentBoard } }));
    }
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

  return <GameContext.Provider value={{ boards, updateTile, setBoards, initializeBoard }}>{children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
