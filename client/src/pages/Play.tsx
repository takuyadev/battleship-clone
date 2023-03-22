import EditBoard from '@components/organisms/app/EditBoard';
import { useShips } from '@hooks/useShips';
import { useBoard } from '@hooks/useBoard';
import { useState, useRef, useEffect } from 'react';
import Button from '@components/atoms/buttons/Button';
import { useOnOff } from '@hooks/useOnOff';
import InputLabel from '@components/molecules/form/InputLabel';
import RadioButton from '@components/molecules/form/RadioButton';

const GAME_FORM = {
  gameFormat: '',
  boardSize: 10,
};

const Play = () => {
  const [playerBoard, setPlayerBoard] = useBoard({ x: 10, y: 10 });
  const [playerShips, setPlayerShips] = useShips();
  const [config, setConfig] = useState({ ...GAME_FORM });
  const [showBoard, setShowBoard] = useOnOff(false);
  const [gameFormat, setGameFormat] = useState('');

  useEffect(() => {
    setPlayerBoard({
      type: 'initialize-board',
      payload: { boardSize: config.boardSize },
    });
  }, [config]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      {!showBoard && (
        <form
          className='flex flex-col items-center gap-4 bg-slate-50 shadow-lg rounded-lg p-4 max-w-2xl'
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();

            if (config.gameFormat && config.boardSize) {
              setShowBoard({ type: 'on' });
            }
          }}
        >
          <h1 className='font-display text-xl'>How would you like to play?</h1>
          <div className='flex gap-4 justify-around w-full '>
            {/* <div className="flex flex-col">
              <label htmlFor='gameFormat'>Local</label>
              <input
                onChange={() =>
                  setConfig((prev) => ({ ...prev, gameFormat: 'local' }))
                }
                required
                name='gameFormat'
                type='radio'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor='gameFormat'>Online</label>
              <input
                onChange={() =>
                  setConfig((prev) => ({ ...prev, gameFormat: 'online' }))
                }
                required
                name='gameFormat'
                type='radio'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor='gameFormat'>Computer</label>
              <input
                onChange={() =>
                  setConfig((prev) => ({ ...prev, gameFormat: 'computer' }))
                }
                required
                name='gameFormat'
                type='radio'
              />
            </div> */}
            <ul className='grid w-full gap-6 md:grid-cols-3'>
              <li>
                <RadioButton
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, gameFormat: 'local' }))
                  }
                  required
                  title='Local'
                  description='Play locally'
                  name='gameFormat'
                  id='gameFormat-local'
                />
              </li>
              <li>
                <RadioButton
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, gameFormat: 'online' }))
                  }
                  required
                  title='Online'
                  description='Play online'
                  name='gameFormat'
                  id='gameFormat-online'
                />
              </li>
              <li>
                <RadioButton
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, gameFormat: 'computer' }))
                  }
                  required
                  title='Computer'
                  description='Play against computer'
                  name='gameFormat'
                  id='gameFormat-compouter'
                />
              </li>
            </ul>
          </div>
          <hr />
          <InputLabel
            type='number'
            required
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                boardSize: Number(e.target.value),
              }))
            }
            value={config.boardSize}
            label='Board Size (6-10)'
            htmlFor='boardSize'
            name='boardSize'
          />
          <Button className="w-full" type='submit' text='Next' />
        </form>
      )}

      {showBoard && (
        <EditBoard
          board={playerBoard}
          ships={playerShips}
          setBoard={setPlayerBoard}
          setShips={setPlayerShips}
          boardSize={config.boardSize}
        />
      )}
    </div>
  );
};

export default Play;
