import EditBoard from '@components/organisms/app/EditBoard';
import Button from '@components/atoms/buttons/Button';
import { GameContext } from '@context/GameContext';
import { useContext, useEffect } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import ComputerBoard from '@components/organisms/app/ComputerBoard';
import { isTilePlaced, selectMove } from '@utils/index';

const Computer = () => {
  const {
    playerBoard,
    setPlayerBoard,
    playerShips,
    setPlayerShips,
    opponentBoard,
    setOpponentBoard,
    config,
  } = useContext(GameContext);
  const [isEdit, setIsEdit] = useOnOff(true);
  const [isTurn, setIsTurn] = useOnOff(true);

  const onFinishEdit = () => {
    if (true /*configure condition when all pieces are placed*/) {
      setIsEdit({ type: 'off' });
    }
  };

  useEffect(() => {
    if (!isTurn) {
      const callback = (): { x: number; y: number } => {
        const [x, y] = selectMove();
        if (isTilePlaced(playerBoard, { x, y })) {
          return callback();
        }

        return { x, y };
      };
      const coords = callback();

      setPlayerBoard({ type: 'attack-tile', payload: { coords } });
      setIsTurn({ type: 'on' });
    }
  }, [opponentBoard]);

  return (
    <div>
      {isEdit && (
        <>
          <EditBoard
            board={playerBoard}
            setBoard={setPlayerBoard}
            setShips={setPlayerShips}
            ships={playerShips}
            boardSize={config.boardSize}
          />
          <Button onClick={onFinishEdit} text='Finish' />
        </>
      )}

      {!isEdit && (
        <ComputerBoard
          playerBoard={playerBoard}
          setPlayerBoard={setPlayerBoard}
          opponentBoard={opponentBoard}
          setOpponentBoard={setOpponentBoard}
          isTurn={isTurn}
          setIsTurn={setIsTurn}
        />
      )}
    </div>
  );
};

export default Computer;
