import { useState } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import { isShipInBoundaries } from '@utils/index';
import { BoardEnum, OnOffEnum, ShipsEnum } from '@hooks/models/_index';
import { Coordinate, Board, SetBoard, SetShips, Ships } from '@models/_index';
import { IoMdRefreshCircle } from 'react-icons/io';
import { FaExclamationCircle } from 'react-icons/fa';
import { BsArrowLeftCircle } from 'react-icons/bs';
import IconButton from '@components/atoms/buttons/IconButton';
import ButtonIndicator from '@components/molecules/board/ButtonIndicator';
import GridBoard from '@components/molecules/board/GridBoard';
import Card from '@components/atoms/ui/Card';

interface IEdit_Board {
  board: Board;
  setBoard: SetBoard;
  ships: Ships;
  setShips: SetShips;
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
  const placeShip = ({ x, y }: Coordinate) => {
    // Check if ship can be placed onto the board
    const checkBoard = isShipInBoundaries(
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
      coords: prevCoords,
      height: prevHeight,
      isPlaced: prevIsPlaced,
      isRotated: prevIsRotated,
    } = ships[currentShipSize - 1];

    // Update isplaced to true, if it is not placed yet
    if (!prevIsPlaced) {
      setShips({
        type: ShipsEnum.UPDATE_PLACED,
        payload: { height: currentShipSize },
      });
    }

    // Only remove if ship has been placed
    if (prevIsPlaced) {
      setBoard({
        type: BoardEnum.REMOVE_SHIP,
        payload: {
          coords: prevCoords[0].coords,
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
      type: BoardEnum.ADD_SHIP,
      payload: {
        coords: { x, y },
        options: { height: currentShipSize, isRotated },
      },
    });

    // Edit rotation after ship has been removed
    setShips({
      type: ShipsEnum.ROTATE_SHIP,
      payload: { height: currentShipSize, isRotated },
    });

    // Update coordinates
    setShips({
      type: ShipsEnum.UPDATE_COORDINATES,
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
              setShips({ type: ShipsEnum.INITIALIZE_SHIPS, payload: null });
              setBoard({
                type: BoardEnum.INITIALIZE_BOARD,
                payload: {
                  boardSize,
                },
              });
            }}
          />

          <IconButton
            icon={<IoMdRefreshCircle size={48} />}
            onClick={() => {
              setIsRotated({ type: OnOffEnum.FLIP });
            }}
          />
        </div>
      </div>

      <Card>
        {ships.map((ship, i) => {
          return (
            <ButtonIndicator
              key={i}
              onClick={() => setCurrentShipSize(ship.height)}
              isPlaced={ship.isPlaced}
              text={`${ship.name} (${ship.height})`}
            />
          );
        })}
      </Card>
    </div>
  );
};

export default EditBoard;
