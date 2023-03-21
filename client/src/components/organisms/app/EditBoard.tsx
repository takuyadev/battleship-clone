import GridBoard from '@components/molecules/board/GridBoard';
import { useOnOff } from '@hooks/useOnOff';
import { isShipPlaceable } from '@utils/index';
import { Coordinates, IBoard } from '@models/types';
import { useState } from 'react';
import { IShips, ShipAction, BoardAction } from '@models/interfaces';

interface IEdit_Board {
  board: IBoard;
  setBoard: React.Dispatch<BoardAction>;
  ships: IShips[];
  setShips: React.Dispatch<ShipAction>;
}

const EditBoard = ({
  board,
  setBoard,
  ships,
  setShips,
}: IEdit_Board): JSX.Element => {
  const [isRotated, setIsRotated] = useOnOff(false);
  const [currentShipSize, setCurrentShipSize] = useState(5);

  // Place ship while the game is in edit mode
  const placeShip = ({ x, y }: Coordinates) => {

    // Check if ship can be placed onto the board
    const checkBoard = isShipPlaceable(
      board,
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
    } = ships[currentShipSize - 1];

    // Update isplaced to true, if it is not placed yet
    if (!prevIsPlaced) {
      setShips({
        type: 'update-placed',
        payload: { height: currentShipSize },
      });
    }

    // Only remove if ship has been placed
    if (prevIsPlaced) {
      setBoard({
        type: 'remove-ship',
        payload: {
          coords: prevCoords,
          options: {
            height: prevHeight,
            isRotated: prevIsRotated,
          },
        },
      });
    }

    // Always add ship regardless of previous checks
    // Add ship to the board with new settings
    setBoard({
      type: 'add-ship',
      payload: {
        coords: { x, y },
        options: { height: currentShipSize, isRotated },
      },
    });

    // Edit rotation after ship has been removed
    setShips({
      type: 'rotate-ship',
      payload: { height: currentShipSize, isRotated },
    });

    // Update coordinates
    setShips({
      type: 'update-coordinates',
      payload: {
        height: currentShipSize,
        coords: { x, y },
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          setIsRotated({ type: 'flip' });
        }}
      >
        Rotate Board
      </button>

      <button onClick={() => setCurrentShipSize(1)}>1</button>
      <button onClick={() => setCurrentShipSize(2)}>2</button>
      <button onClick={() => setCurrentShipSize(3)}>3</button>
      <button onClick={() => setCurrentShipSize(4)}>4</button>
      <button onClick={() => setCurrentShipSize(5)}>5</button>

      <GridBoard
        board={board}
        onClick={(x: number, y: number) => placeShip({ x, y })}
      />
    </div>
  );
};

export default EditBoard;
