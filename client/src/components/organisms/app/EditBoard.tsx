import GridBoard from '@components/molecules/board/GridBoard';
import { useOnOff } from '@hooks/useOnOff';
import { isShipPlaceable } from '@utils/index';
import { Coordinates, IBoard } from '@models/types';
import { useState } from 'react';
import { IShips, ShipAction, BoardAction } from '@models/interfaces';
import { IoMdRefreshCircle } from 'react-icons/io';
import { FaExclamationCircle } from 'react-icons/fa';
import { BsArrowLeftCircle } from 'react-icons/bs';
import ButtonIndicator from '@components/molecules/board/ButtonIndicator';
import Card from '@components/atoms/ui/Card';
import IconButton from '@components/atoms/buttons/IconButton';

interface IEdit_Board {
  board: IBoard;
  setBoard: React.Dispatch<BoardAction>;
  ships: IShips[];
  setShips: React.Dispatch<ShipAction>;
  boardSize: number;
}

const EditBoard = ({
  board,
  setBoard,
  ships,
  setShips,
  boardSize,
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
    <div className='flex flex-col gap-8 items-center'>
      <GridBoard
        board={board}
        onClick={(x: number, y: number) => placeShip({ x, y })}
      />
      <div className='flex flex-col gap-2 items-center'>
        <BsArrowLeftCircle
          size={32}
          className={`duration-200 ${
            !isRotated && 'rotate-90'
          } text-indigo-500`}
        />

        <div className='flex gap-4 '>
          <IconButton
            className='text-rose-500'
            icon={<FaExclamationCircle size={42} />}
            onClick={() => {
              setShips({ type: 'initialize-ships', payload: null });
              setBoard({
                type: 'initialize-board',
                payload: {
                  boardSize,
                },
              });
            }}
          />

          <IconButton
            icon={<IoMdRefreshCircle size={48} />}
            onClick={() => {
              setIsRotated({ type: 'flip' });
            }}
          />
        </div>
      </div>

      <Card>
        <ButtonIndicator
          onClick={() => setCurrentShipSize(1)}
          isPlaced={ships[0].isPlaced}
          text={'1'}
        />
        <ButtonIndicator
          onClick={() => setCurrentShipSize(2)}
          isPlaced={ships[1].isPlaced}
          text={'2'}
        />
        <ButtonIndicator
          onClick={() => setCurrentShipSize(3)}
          isPlaced={ships[2].isPlaced}
          text={'3'}
        />
        <ButtonIndicator
          onClick={() => setCurrentShipSize(4)}
          isPlaced={ships[3].isPlaced}
          text={'4'}
        />
        <ButtonIndicator
          onClick={() => setCurrentShipSize(5)}
          isPlaced={ships[4].isPlaced}
          text={'5'}
        />
      </Card>
    </div>
  );
};

export default EditBoard;
