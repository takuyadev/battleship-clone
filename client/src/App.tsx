import EditBoard from '@components/organisms/app/EditBoard';
import { useBoard } from '@hooks/useBoard';
import { useShips } from '@hooks/useShips';
import { ROWS, COLUMNS } from '@data/constants';

function App(): JSX.Element {
  const [playerBoard, setPlayerBoard] = useBoard({ x: ROWS, y: COLUMNS });
  const [playerShips, setPlayerShips] = useShips();
  return (
    <div>
      <EditBoard
        board={playerBoard}
        ships={playerShips}
        setBoard={setPlayerBoard}
        setShips={setPlayerShips}
      />
    </div>
  );
}

export default App;
