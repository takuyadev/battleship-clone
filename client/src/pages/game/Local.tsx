import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameContext } from '@context/GameContext';
import { useOnOff } from '@hooks/useOnOff';
import { isAllShipsPlaced } from '@utils/_index';
import { GameEnum, OnOffEnum } from '@hooks/models/_index';
import { slideLeft } from '@data/anim';
import EditBoard from '@components/organisms/app/EditBoard';
import LocalBoard from '@components/organisms/app/LocalBoard';
import PageTransition from '@components/atoms/ui/PageTransition';
import Button from '@components/atoms/buttons/Button';

const Local = () => {
  const { player, opponent, setGame, game, config } = useContext(GameContext);
  const [isEdit, setIsEdit] = useState('player');
  const [isDone, setIsDone] = useOnOff(false);

  // Handlers for player
  const onPlayerEdit = () => setIsEdit('opponent');
  const onOpponentEdit = () => setIsEdit('end');

  // Listens to is edit, and determines if they can proceed to next step
  useEffect(() => {
    if (isEdit === 'player') {
      const condition = isAllShipsPlaced(player.ships);
      return condition
        ? setIsDone({ type: OnOffEnum.ON })
        : setIsDone({ type: OnOffEnum.OFF });
    }

    if (isEdit === 'opponent') {
      const condition = isAllShipsPlaced(opponent.ships);
      return condition
        ? setIsDone({ type: OnOffEnum.ON })
        : setIsDone({ type: OnOffEnum.OFF });
    }
    //
    setIsDone({ type: OnOffEnum.OFF });
  }, [player.board, opponent.board, isEdit]);

  //
  return (
    <div className='flex justify-center w-full'>
      <AnimatePresence>
        {isEdit === 'player' && (
          <motion.div
            key='player'
            className='flex flex-col gap-2'
            // @ts-ignore -- typescript bug with framer-motion
            variants={slideLeft}
            animate='animate'
            initial='initial'
            exit='exit'
          >
            <EditBoard
              playerName={game.player.name}
              board={player.board}
              setBoard={player.setBoard}
              ships={player.ships}
              setShips={player.setShips}
              boardSize={config.boardSize}
              setName={(e) => {
                setGame({
                  type: GameEnum.UPDATE_PLAYER_NAME,
                  payload: {
                    name: e.target.value,
                    coords: { x: 0, y: 0 },
                  },
                });
              }}
            />
            <Button
              className='mt-8'
              disabled={!isDone}
              onClick={onPlayerEdit}
              text='Next'
            />
          </motion.div>
        )}

        {isEdit === 'opponent' && (
          <motion.div
            key='opponent'
            className='flex flex-col gap-2'
            // @ts-ignore -- typescript bug with framer-motion; no noticeable bug
            variants={slideLeft}
            animate='animate'
            initial='initial'
            exit='exit'
          >
            <EditBoard
              playerName={game.opponent.name}
              board={opponent.board}
              setBoard={opponent.setBoard}
              ships={opponent.ships}
              setShips={opponent.setShips}
              boardSize={config.boardSize}
              setName={(e) => {
                setGame({
                  type: GameEnum.UPDATE_OPPONENT_NAME,
                  payload: {
                    name: e.target.value,
                    coords: { x: 0, y: 0 },
                  },
                });
              }}
            />
            <div className='flex justify-between gap-2'>
              <Button className='mt-8' onClick={onPlayerEdit} text='Go back' />
              <Button
                className='mt-8'
                disabled={!isDone}
                onClick={onOpponentEdit}
                text='Finish'
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isEdit === 'end' && (
        <PageTransition className='w-full'>
          <LocalBoard />
        </PageTransition>
      )}
    </div>
  );
};

export default Local;
