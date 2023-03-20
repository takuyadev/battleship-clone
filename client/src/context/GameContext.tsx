import { useState, useEffect, createContext, useReducer } from "react";
import { IGame } from "../models/interfaces";
import {
  IBoard,
  DisplayBoard,
  InitializeBoard,
  PlayerSelection,
  UpdateBoard as SetBoard,
  AttackTile,
  Messages,
} from "../models/types";
import {
  generateBoard,
  checkTile,
  attackTile,
  formatBoard,
  isBoardWin as isBoardLose,
} from "../utils/board/board";
import { selectMove } from "../utils/ai/ai";

// Context Typing
interface IGameContext {
  boards: IGame;
  isTurn: boolean;
  checkWinner: boolean | null;
  messages: Messages;
  setMessages: React.Dispatch<React.SetStateAction<Messages>>;
  setIsTurn: React.Dispatch<React.SetStateAction<boolean>>;
  initializeBoard: InitializeBoard;
  playerAttack: AttackTile;
  enemyAttack: AttackTile;
  updateBoard: SetBoard;
  displayBoard: DisplayBoard;
  listenGameState: () => void;
  listenToComputer: () => void;
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
const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, null)

  const [boards, setBoards] = useState<IGame>(PLAYER_DATA);
  const [isTurn, setIsTurn] = useState(true);
  const [messages, setMessages] = useState<Messages>([]);
  const [checkWinner, setCheckWinner] = useState<boolean | null>(null);

  // Initializes the board with a 10x10 grid
  // const initializeBoard = () => {
  //   setBoards({
  //     player: {
  //       username: "Player 1",
  //       board: generateBoard(10, 10),
  //     },
  //     opponent: {
  //       username: "Player 2",
  //       board: generateBoard(10, 10),
  //     },
  //   });
  // };

  // Actaul attack algorithm to mark and update board
  // const attack = (player: PlayerSelection, x: number, y: number): void => {
  //   const { board } = boards[player];

  //   // If tile has already been clicked, don't give turn
  //   if (!checkTile(board, x, y)) {
  //     return;
  //   }

  //   // After check, update board based on hit
  //   const updatedBoard = attackTile(board, x, y);
  //   setBoards((prev) => ({
  //     ...prev,
  //     [player]: { ...prev[player], board: updatedBoard },
  //   }));
  //   setIsTurn((prev) => !prev);
  //   setMessages((prev) => [...prev, `${player} attacked ${x} ${y}`]);
  // };

  // // Updates the specific tile targetted by the player
  // const playerAttack = (x: number, y: number): boolean => {
  //   if (isTurn) {
  //     attack("opponent", x, y);
  //     return true;
  //   }
  //   return false;
  // };

  // Updates the specific tile targetted by the opponent
  const enemyAttack = (x: number, y: number): boolean => {
    if (!isTurn) {
      attack("player", x, y);
      return true;
    }
    return false;
  };

  // Update entire board based on board and player name provided
  const setBoard = (board: IBoard, player: PlayerSelection): void => {
    setBoards((prev) => ({ ...prev, [player]: { ...prev[player], board } }));
  };

  // If given player name and boolean value, show or hide map location
  const displayBoard = (player: PlayerSelection, isShow: boolean): IBoard => {
    return formatBoard(boards[player].board, isShow);
  };

  // Listen to game state
  const listenToComputer = () =>
    useEffect(() => {
      // Recurses callback until the checked tile returns true
      if (!isTurn) {
        // Callback
        const callback = (): number[] => {
          const [x, y] = selectMove();

          // If tile is checked return false, and recurse
          if (!checkTile(boards.player.board, x, y)) {
            return callback();
          }

          // return x, y on true
          return [x, y];
        };

        const [x, y] = callback();
        enemyAttack(x, y);
      }
    }, [isTurn]);

  // Listen to game state
  const listenGameState = () =>
    useEffect(() => {
      if (isBoardLose(boards.player.board) === false) {
        setCheckWinner(true);
        setMessages((prev) => [...prev, `opponent wins`]);
      }

      if (isBoardLose(boards.opponent.board) === false) {
        setCheckWinner(false);
        setMessages((prev) => [...prev, `player wins`]);
      }
    }, [boards]);

  return (
    <GameContext.Provider
      value={{
        boards,
        isTurn,
        messages,
        checkWinner,
        listenToComputer,
        listenGameState,
        setMessages,
        setIsTurn,
        updateBoard: setBoard,
        displayBoard,
        playerAttack,
        enemyAttack,
        initializeBoard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
