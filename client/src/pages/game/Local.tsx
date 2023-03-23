import EditBoard from '@components/organisms/app/EditBoard';
import Button from '@components/atoms/buttons/Button';
import { GameContext } from '@context/GameContext';
import { useContext, useEffect, useState } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import { isAllShipsPlaced } from '@utils/index';
import LocalBoard from '@components/organisms/app/LocalBoard';

const Local = () => {
  const {
    playerBoard,
    setPlayerBoard,
    playerShips,
    setPlayerShips,
    opponentBoard,
    setOpponentBoard,
    opponentShips,
    setOpponentShips,
    config,
  } = useContext(GameContext);
  const [isEdit, setIsEdit] = useState('player');
  const [isDone, setIsDone] = useOnOff(false);

  const onPlayerEdit = () => setIsEdit('opponent');
  const onOpponentEdit = () => setIsEdit('end');

  useEffect(() => {
    if (isEdit === 'player') {
      const condition = isAllShipsPlaced(playerShips);
      return condition ? setIsDone({ type: 'on' }) : setIsDone({ type: 'off' });
    }

    if (isEdit === 'opponent') {
      const condition = isAllShipsPlaced(opponentShips);
      return condition ? setIsDone({ type: 'on' }) : setIsDone({ type: 'off' });
    }

    setIsDone({ type: 'off' });
  }, [playerBoard, opponentBoard, isEdit]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-display text-xl mb-2'>Setting up for {isEdit}</h1>
      <h1 className='text-center text-sm text-slate-400 mb-4'>
        Don't let the other person peek!
      </h1>

      {isEdit === 'player' && (
        <>
          <EditBoard
            board={playerBoard}
            setBoard={setPlayerBoard}
            ships={playerShips}
            setShips={setPlayerShips}
            boardSize={config.boardSize}
          />
          <Button
            className='mt-8'
            disabled={!isDone}
            onClick={onPlayerEdit}
            text='Next'
          />
        </>
      )}

      {isEdit === 'opponent' && (
        <>
          <EditBoard
            board={opponentBoard}
            setBoard={setOpponentBoard}
            ships={opponentShips}
            setShips={setOpponentShips}
            boardSize={config.boardSize}
          />

          <div className='flex gap-4'>
            <Button
              className='mt-8'
              onClick={() => {
                setIsEdit('player');
              }}
              text='Go back'
            />
            <Button
              className='mt-8'
              disabled={!isDone}
              onClick={onOpponentEdit}
              text='Finish'
            />
          </div>
        </>
      )}

      {isEdit === 'end' && (
        <LocalBoard
          playerBoard={playerBoard}
          playerShips={playerShips}
          setPlayerBoard={setPlayerBoard}
          setPlayerShips={setPlayerShips}
          opponentShips={opponentShips}
          setOpponentShips={setOpponentShips}
          opponentBoard={opponentBoard}
          setOpponentBoard={setOpponentBoard}
        />
      )}
    </div>
  );
};

export default Local;
