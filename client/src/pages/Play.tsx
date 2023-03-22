import EditBoard from '@components/organisms/app/EditBoard';
import { useShips } from '@hooks/useShips';
import { useBoard } from '@hooks/useBoard';

const Play = () => {
  const [playerBoard, setPlayerBoard] = useBoard({ x: 10, y: 10 });
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
};

export default Play;
