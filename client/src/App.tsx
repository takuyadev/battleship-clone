import { useBoard } from '@hooks/useBoard';
import GameBoard from '@components/molecules/GameBoard';
import { useOnOff } from '@hooks/useOnOff';
import { ROWS, COLUMNS } from '@data/constants';
import { useShips } from '@hooks/useShips';
import { isShipPlaceable } from './utils';
import { Coordinates } from '@models/types';
import { useState } from 'react';

function App(): JSX.Element {
  const [isEdit, setIsEdit] = useOnOff(true);
  const [isRotate, setIsRotate] = useOnOff(false);
  const [height, setHeight] = useState(5);
  const [playerBoard, setPlayerBoard] = useBoard({
    x: ROWS,
    y: COLUMNS,
  });
  const [playerShips, setPlayerShips] = useShips();

  const placeShip = ({ x, y }: Coordinates) => {
    const checkBoard = isShipPlaceable({ x, y }, { height, isRotate });

    if (!checkBoard) {
      return false;
    }

    if (playerShips[height].isPlaced) {
      const { x: prevX, y: prevY } = playerShips[height].coordinates;

      setPlayerBoard({
        type: 'place-ship',
        payload: {
          coords: { x: prevX, y: prevY },
          options: { height, isRotate, isRemove: true },
        },
      });

      setPlayerBoard({
        type: 'place-ship',
        payload: {
          coords: { x, y },
          options: { height, isRotate, isRemove: false },
        },
      });

      return true;
    }

    // If board has space for selected ship, then update board
    if (!checkBoard) {
      setPlayerShips({ type: 'update-ship', payload: { height: height } });
    }
  };

  return (
    <div>
      <button onClick={() => setIsEdit({ type: 'flip' })}>asdfasdf</button>
      {isEdit ? 'true' : 'false'}
      {height}
      {isEdit && (
        <GameBoard
          board={playerBoard}
          onClick={(x: number, y: number) => placeShip({ x, y })}
        />
      )}
      {!isEdit && (
        <GameBoard
          board={playerBoard}
          onClick={(x: number, y: number) => {
            setPlayerBoard({
              type: 'attack-tile',
              payload: { coords: { x, y }, mark: 1 },
            });
          }}
        />
      )}
    </div>
  );
}

export default App;
