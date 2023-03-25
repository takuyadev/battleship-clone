import EditBoard from '@components/organisms/app/EditBoard';
import Button from '@components/atoms/buttons/Button';
import { GameContext } from '@context/GameContext';
import { useContext } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import ComputerBoard from '@components/organisms/app/ComputerBoard';
import { OnOffEnum } from '@hooks/models/_index';

const Computer = () => {
  const { player, opponent, config } = useContext(GameContext);
  const [isEdit, setIsEdit] = useOnOff(true);

  const onFinishEdit = () => {
    if (true /*configure condition when all pieces are placed*/) {
      setIsEdit({ type: OnOffEnum.OFF });
    }
  };

  return (
    <div>
      {isEdit && (
        <>
          <EditBoard
            board={player.board}
            setBoard={player.setBoard}
            setShips={player.setShips}
            ships={player.ships}
            boardSize={config.boardSize}
          />
          <Button onClick={onFinishEdit} text='Finish' />
        </>
      )}

      {!isEdit && <ComputerBoard player={player} opponent={opponent} />}
    </div>
  );
};

export default Computer;
