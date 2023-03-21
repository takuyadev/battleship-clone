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
  const [currentShipSize, setCurrentShipSize] = useState(5);
  const [playerBoard, setPlayerBoard] = useBoard({
    x: ROWS,
    y: COLUMNS,
  });
  const [playerShips, setPlayerShips] = useShips();

  // Place ship while the game is in edit mode
  const placeShip = ({ x, y }: Coordinates) => {
    // Check if ship can be placed onto the board
    const checkBoard = isShipPlaceable(
      playerBoard,
      { x, y },
      { height: currentShipSize, isRotated }
    );

    // If ship cannot be placed, don't do anything
    if (!checkBoard) {
      return false;
    }

    // Select current iteration of the ship to be replaced
    const {
      coordinates: prevCoords,
      height: prevHeight,
      isPlaced: prevIsPlaced,
      isRotated: prevIsRotated,
    } = playerShips[currentShipSize - 1];
    
    // If currently selected ship size has already been placed
    if (prevIsPlaced) {

      // Remove current iteration off the board
      setPlayerBoard({
        type: 'remove-ship',
        payload: {
          coords: prevCoords,
          options: {
            height: prevHeight,
            isRotated: prevIsRotated,
          },
        },
      });

      // Edit rotation after ship has been removed
      setPlayerShips({
        type: 'rotate-ship',
        payload: { height: currentShipSize, isRotated },
      });

      // Add ship to the board with new settings
      setPlayerBoard({
        type: 'add-ship',
        payload: {
          coords: { x, y },
          options: { height: currentShipSize, isRotated },
        },
      });

      // Update coordinates
      setPlayerShips({
        type: 'update-coordinates',
        payload: {
          height: currentShipSize,
          coords: { x, y },
        },
      });

      return true;
    }

    // Add new ship to board if no ship was placed
    setPlayerBoard({
      type: 'add-ship',
      payload: {
        coords: { x, y },
        options: { height: currentShipSize, isRotated },
      },
    });

    // Update ship positions and information
    setPlayerShips({
      type: 'update-placed',
      payload: { height: currentShipSize },
    });

    setPlayerShips({
      type: 'update-coordinates',
      payload: { height: currentShipSize, coords: { x, y } },
    });

    return true;
  };

  const updateCurrentShip = (newShipHeight: number) => {
    setCurrentShipSize(newShipHeight);
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

      {currentShipSize}
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
