import { useState } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import { isShipInBoard } from '@utils/_index';
import { BoardEnum, OnOffEnum, ShipsEnum } from '@hooks/models/_index';
import { Coordinate, Board, SetBoard, SetShips, Ships } from '@models/_index';
import { IoMdRefreshCircle } from 'react-icons/io';
import { FaExclamationCircle } from 'react-icons/fa';
import { BsArrowLeftCircle } from 'react-icons/bs';
import IconButton from '@components/atoms/buttons/IconButton';
import ButtonIndicator from '@components/molecules/board/ButtonIndicator';
import GridBoard from '@components/molecules/board/GridBoard';
import Card from '@components/atoms/ui/Card';

interface EditBoardProps {
  playerName: string;
  board: Board;
  setBoard: SetBoard;
  ships: Ships;
  setShips: SetShips;
  boardSize: number;
}

const EditBoard = ({
  playerName,
  board,
  setBoard,
  ships,
  setShips,
  boardSize,
}: EditBoardProps): JSX.Element => {
  const [isRotated, setIsRotated] = useOnOff(false);
  const [currentShipId, setCurrentId] = useState(4);

  // Place ship while the game is in edit mode
  const placeShip = ({ x, y }: Coordinate) => {
    // Select current iteration of the ship to be replaced
    const ship = ships[currentShipId]

    if (!ship) {
      return false;
    }

    // Check if ship can be placed onto the board
    const checkBoard = isShipInBoard(
      board,
      { x, y },
      { height: ship.height, isRotated }
    );

    // If ship cannot be placed, don't do anything
    if (!checkBoard) {
      return false;
    }

    const {
      coords: prevCoords,
      height: prevHeight,
      isPlaced: prevIsPlaced,
      isRotated: prevIsRotated,
    } = ship;

    // Update isplaced to true, if it is not placed yet
    if (!prevIsPlaced) {
      setShips({
        type: ShipsEnum.UPDATE_PLACED,
        payload: { id: ship.id },
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
        options: { height: ship.height, isRotated },
      },
    });

    // Edit rotation after ship has been removed
    setShips({
      type: ShipsEnum.ROTATE_SHIP,
      payload: { id: ship.id, isRotated },
    });

    // Update coordinates
    setShips({
      type: ShipsEnum.UPDATE_COORDINATES,
      payload: {
        id: ship.id,
        coords: { x, y },
      },
    });
  };

  return (
    <div className='flex flex-col gap-8 items-center'>
      <h2 className='font-display text-3xl text-slate-500 '>
        {playerName}'s board
      </h2>
      <GridBoard
        board={board}
        onClick={({ x, y }: Coordinate) => placeShip({ x, y })}
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

      <Card className='flex-col'>
        <div className='flex gap-4'>
          {ships.map((ship, i) => {
            return (
              <ButtonIndicator
                key={i}
                onClick={() => setCurrentId(ship.id)}
                isPlaced={ship.isPlaced}
                text={`${ship.name} (${ship.height})`}
              />
            );
          })}
        </div>
        <div className='relative w-full bg-indigo-200 h-2 rounded-lg'>
          <div
            style={{
              left: `${100 / (ships.length / currentShipId)}%`,
            }}
            className={`duration-200 absolute w-[20%] h-2 bg-indigo-500 rounded-lg`}
          ></div>
        </div>
      </Card>
    </div>
  );
};

export default EditBoard;
