import EditBoard from '@components/organisms/app/EditBoard';
import { GameContext } from '@context/GameContext';
import { useContext, useEffect, useState } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import { isAllShipsPlaced } from '@utils/index';
import LocalBoard from '@components/organisms/app/LocalBoard';
import Button from '@components/atoms/buttons/Button';
import { OnOffEnum } from '@hooks/models/_index';

const Local = () => {
  const { player, opponent, config } = useContext(GameContext);
  const [isEdit, setIsEdit] = useState('player');
  const [isDone, setIsDone] = useOnOff(false);

  const onPlayerEdit = () => setIsEdit('opponent');
  const onOpponentEdit = () => setIsEdit('end');

  useEffect(() => {
    if (isEdit === 'player') {
      const condition = isAllShipsPlaced(player.ships);
      return condition
        ? setIsDone({ type: OnOffEnum.ON })
        : setIsDone({ type: OnOffEnum.OFF });
    }

    if (isEdit === 'opponent') {
      const condition = isAllShipsPlaced(player.ships);
      return condition
        ? setIsDone({ type: OnOffEnum.ON })
        : setIsDone({ type: OnOffEnum.OFF });
    }

    setIsDone({ type: OnOffEnum.OFF });
  }, [player.board, opponent.board, isEdit]);

  return (
    <div className='flex flex-col items-center w-full'>

      {isEdit === 'player' && (
        <>
          <EditBoard
            board={player.board}
            setBoard={player.setBoard}
            ships={player.ships}
            setShips={player.setShips}
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
            board={opponent.board}
            setBoard={opponent.setBoard}
            ships={opponent.ships}
            setShips={opponent.setShips}
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

      {isEdit === 'end' && <LocalBoard player={player} opponent={opponent} />}
    </div>
  );
};

export default Local;
