import { useState, useContext, useEffect } from "react";
import { GameContext } from "./context/GameContext";
import GameScreen from "./components/organisms/GameScreen";
import EditScreen from "./components/organisms/EditScreen";
import { generateBoard, checkPlaceable, editBoard } from "./utils/board";
import { IPieces } from "./models/interfaces";
import { BoardOptions, IBoard } from "./models/types";
import { BOARD, SHIP_PIECES } from "./utils/constants/constants";

function App(): JSX.Element {
  const {
    boards,
    messages,
    listenGameState,
    playerAttack,
    enemyAttack,
    updateBoard,
    initializeBoard,
  } = useContext(GameContext);

  const [board, setBoard] = useState(generateBoard(10, 10));
  const [isEdit, setIsEdit] = useState(true);
  const [shipHeight, setShipHeight] = useState(5);
  const [isRotate, setIsRotate] = useState(false);
  const [pieces, setPieces] = useState<IPieces[]>(SHIP_PIECES);
  // Place ship onto the board

  const placeShip = (
    board: IBoard,
    pieces: IPieces[],
    x: number,
    y: number,
    options: BoardOptions
  ) => {
    let newPieces = [...pieces];
    const { height, isRotate } = options;
    const index = height - 1;

    // Check if current position can place a ship
    const placeable = checkPlaceable(board, x, y, { isRotate, height });

    if (!placeable) {
      return board;
    }

    // If ship has already been placed, remove piece from board
    if (pieces[index].isPlaced) {
      const oldCoords = pieces[index].coordinates;

      // Remove ship off board based on previous coordinates
      let removeBoard = editBoard(board, {x: oldCoords.x, y:oldCoords.y}, {
        height: height,
        isRotate: isRotate,
        isRemove: true,
      });

      if (!removeBoard) {
        newPieces[index] = {
          height,
          coordinates: { x: oldCoords.x, y: oldCoords.y },
          isPlaced: true,
        };
        setPieces(newPieces);
        return board;
      }

      // Add piece back onto board
      let shipBoard = editBoard(removeBoard, x, y, {
        height,
        isRotate,
        isRemove: false,
      });

      if (!shipBoard) {
        newPieces[index] = {
          height,
          coordinates: { x: oldCoords.x, y: oldCoords.y },
          isPlaced: true,
        };
        setPieces(newPieces);
        return board;
      }

      // Return new board
      newPieces[index] = { height, coordinates: { x, y }, isPlaced: true };
      setPieces(newPieces);
      return shipBoard;
    }

    // Setup the new pieces
    const shipBoard = editBoard(board, x, y, {
      height,
      isRotate,
      isRemove: false,
    });

    // If ship board returns false, don't let further edits happenn
    if (!shipBoard) {
      return board;
    }

    newPieces[index] = { height, coordinates: { x, y }, isPlaced: true };
    setPieces(newPieces);
    return shipBoard;
  };

  const startGame = () => {
    setIsEdit((prev) => !prev);
    initializeBoard();
    updateBoard(board, "player");
    updateBoard(BOARD, "opponent");
  };

  listenGameState();

  return (
    <div>
      {isEdit && (
        <div>
          <EditScreen
            board={board}
            setBoard={setBoard}
            placeShip={(x: number, y: number) =>
              setBoard(
                placeShip(board, pieces, x, y, { height: shipHeight, isRotate })
              )
            }
          />
          <div className="flex gap-4">
            <button onClick={startGame}>heelo</button>
            <button onClick={() => setShipHeight(5)}>5</button>
            <button onClick={() => setShipHeight(4)}>4</button>
            <button onClick={() => setShipHeight(3)}>3</button>
            <button onClick={() => setShipHeight(2)}>2</button>
            <button onClick={() => setShipHeight(1)}>1</button>
            <button onClick={() => setIsRotate((prev) => !prev)}>heelo</button>
          </div>
        </div>
      )}
      {shipHeight}
      {boards && !isEdit && (
        <GameScreen
          playerAttack={playerAttack}
          enemyAttack={enemyAttack}
          boards={boards}
          messages={messages}
        />
      )}
    </div>
  );
}

export default App;
