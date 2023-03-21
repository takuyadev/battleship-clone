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
  const [currentShip, setCurrentShip] = useState(5);
  const [playerBoard, setPlayerBoard] = useBoard({
    x: ROWS,
    y: COLUMNS,
  });
  const [playerShips, setPlayerShips] = useShips();

  const placeShip = ({ x, y }: Coordinates) => {
    const checkBoard = isShipPlaceable(
      { x, y },
      { height: currentShip, isRotate }
    );
    const shipIndex = currentShip - 1;

    if (!checkBoard) {
      return false;
    }

    if (playerShips[shipIndex].isPlaced) {
      const { x: prevX, y: prevY } = playerShips[shipIndex].coordinates;
      console.log(prevX, prevY);

      setPlayerBoard({
        type: 'place-ship',
        payload: {
          coords: { x: prevX, y: prevY },
          options: { height: currentShip, isRotate, isRemove: true },
        },
      });

      setPlayerBoard({
        type: 'place-ship',
        payload: {
          coords: { x, y },
          options: { height: currentShip, isRotate, isRemove: false },
        },
      });

      setPlayerShips({
        type: 'update-coordinates',
        payload: {
          height: currentShip,
          coords: { x, y },
        },
      });

      return true;
    }

    setPlayerShips({
      type: 'update-placed',
      payload: { height: currentShip },
    });
    setPlayerShips({
      type: 'update-coordinates',
      payload: { height: currentShip, coords: { x, y } },
    });

    return true;
  };

  return (
    <div>
      <button onClick={() => setIsEdit({ type: 'flip' })}>asdfasdf</button>
      {isEdit ? 'true' : 'false'}
      {currentShip}
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
