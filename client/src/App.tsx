import { useBoard } from "@hooks/useBoard";
import GameBoard from "@components/molecules/GameBoard";
import { BOARD_SIZE } from "@data/constants";
const { ROWS, COLUMNS } = BOARD_SIZE;

function App(): JSX.Element {
  const [playerBoard, setPlayerBoard] = useBoard({ x: ROWS, y: COLUMNS });

  return (
    <div>
      <GameBoard board={playerBoard} onClick={() => {}} />
    </div>
  );
}

export default App;
