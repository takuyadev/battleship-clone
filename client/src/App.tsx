import GameScreen from "./components/organisms/GameScreen";
import { useContext, useEffect } from "react";
import { GameContext } from "./context/GameContext";

const BOARD_1 = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

const BOARD_2 = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

function App(): JSX.Element {
  const { boards, isTurn, checkWinner,listenGameState,listenToComputer, playerAttack, enemyAttack, updateBoard, initializeBoard } =
    useContext(GameContext);

  // Initialize board on startup
  useEffect(() => {
    initializeBoard();
    updateBoard(BOARD_1, "player");
    updateBoard(BOARD_2, "opponent");
  }, []);

  listenGameState();
  listenToComputer()


  return (
    <div>
      {boards && <GameScreen playerAttack={playerAttack} enemyAttack={enemyAttack} boards={boards} />}
      {checkWinner && checkWinner ? "player" : "opponent"}
    </div>
  );
}

export default App;
