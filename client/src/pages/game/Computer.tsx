import { useContext, useEffect } from 'react';
import { useOnOff } from '@hooks/useOnOff';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '@context/GameContext';
import { GameEnum, OnOffEnum } from '@hooks/models/_index';
import { isAllShipsPlaced } from '@utils/_index';
import { slideLeft } from '@data/anim';
import Button from '@components/atoms/buttons/Button';
import ComputerBoard from '@components/organisms/app/ComputerBoard';
import EditBoard from '@components/organisms/app/EditBoard';
import PageTransition from '@components/atoms/ui/PageTransition';
const Computer = () => {
  const { player, setGame, config, computerPlaceShips } =
    useContext(GameContext);
  const [isEdit, setIsEdit] = useOnOff(true);
  const [isDone, setIsDone] = useOnOff(false);

  const onFinishEdit = () => {
    setIsEdit({ type: OnOffEnum.OFF });
  };

  useEffect(() => {
    setGame({
      type: GameEnum.UPDATE_OPPONENT_NAME,
      payload: {
        name: 'Computer',
        coords: { x: 0, y: 0 },
      },
    });
    computerPlaceShips();
  }, []);

  useEffect(() => {
    const condition = isAllShipsPlaced(player.ships);
    return condition
      ? setIsDone({ type: OnOffEnum.ON })
      : setIsDone({ type: OnOffEnum.OFF });
  }, [player.board, isDone]);

  return (
    <div className='flex flex-col items-center w-full'>
      <AnimatePresence>
        {isEdit && (
          <motion.div
            className='flex flex-col gap-2'
            // @ts-ignore -- typescript bug with framer-motion; no noticeable bug
            variants={slideLeft}
            animate='animate'
            initial='initial'
            exit='exit'
          >
            <EditBoard
              playerName={player.name}
              board={player.board}
              setBoard={player.setBoard}
              setShips={player.setShips}
              ships={player.ships}
              boardSize={config.boardSize}
              setName={(e) =>
                setGame({
                  type: GameEnum.UPDATE_PLAYER_NAME,
                  payload: {
                    name: e.target.value,
                    coords: { x: 0, y: 0 },
                  },
                })
              }
            />
            <Button onClick={onFinishEdit} text='Finish' disabled={!isDone} />
          </motion.div>
        )}
      </AnimatePresence>
      {!isEdit && (
        <PageTransition className='w-full'>
          <ComputerBoard />
        </PageTransition>
      )}
    </div>
  );
};

export default Computer;
