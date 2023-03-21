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
  const [isRotated, setIsRotated] = useOnOff(false);
  const [currentShip, setCurrentShip] = useState(5);
  const [playerBoard, setPlayerBoard] = useBoard({
    x: ROWS,
    y: COLUMNS,
  });
  const [playerShips, setPlayerShips] = useShips();

  // Place ship while the game is in edit mode
  const placeShip = ({ x, y }: Coordinates) => {
    const checkBoard = isShipPlaceable(
      playerBoard,
      { x, y },
      { height: currentShip, isRotated }
    );
    const shipIndex = currentShip - 1;

    if (!checkBoard) {
      return false;
    }

    if (playerShips[shipIndex].isPlaced) {
      const { x: prevX, y: prevY } = playerShips[shipIndex].coordinates;

      setPlayerBoard({
        type: 'remove-ship',
        payload: {
          coords: { x: prevX, y: prevY },
          options: {
            height: playerShips[shipIndex].height,
            isRotated: playerShips[shipIndex].isRotated,
          },
        },
      });

      setPlayerShips({
        type: 'rotate-ship',
        payload: { height: currentShip, isRotated },
      });

      setPlayerBoard({
        type: 'add-ship',
        payload: {
          coords: { x, y },
          options: { height: currentShip, isRotated },
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

    setPlayerBoard({
      type: 'add-ship',
      payload: {
        coords: { x, y },
        options: { height: currentShip, isRotated },
      },
    });

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

  const updateCurrentShip = (newShipHeight: number) => {
    setCurrentShip(newShipHeight);
  };

  return (
    <div>
      <button onClick={() => setIsEdit({ type: 'flip' })}>asdfasdf</button>
      <button
        onClick={() => {
          setIsRotated({ type: 'flip' });
        }}
      >
        Rotate Board
      </button>

      <button onClick={() => updateCurrentShip(1)}>1</button>
      <button onClick={() => updateCurrentShip(2)}>2</button>
      <button onClick={() => updateCurrentShip(3)}>3</button>
      <button onClick={() => updateCurrentShip(4)}>4</button>
      <button onClick={() => updateCurrentShip(5)}>5</button>

      {currentShip}
      {isEdit && (
        <GameBoard
          board={playerBoard}
          onClick={(x: number, y: number) => placeShip({ x, y })}
        />
      )}
    </div>
  );
}

export default App;
