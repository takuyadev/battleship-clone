import InputLabel from '@components/molecules/form/InputLabel';
import Button from '@components/atoms/buttons/Button';
import RadioField from '@components/molecules/form/RadioField';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IConfig, IGame } from '@models/interfaces';
import { HiOutlineGlobe, HiDesktopComputer, HiUserGroup } from 'react-icons/hi';

// Radio field data
const GAMEFORMAT_OPTIONS = [
  {
    title: 'Local',
    description: 'Play Locally',
    id: 'local',
    icon: <HiUserGroup size={24}/>,
  },
  {
    title: 'Online',
    description: 'Play online',
    id: 'online',
    icon: <HiOutlineGlobe size={24}/>,
  },
  {
    title: 'Computer',
    description: 'Play AI',
    id: 'computer',
    icon: <HiDesktopComputer size={24}/>,
  },
];

interface IGameOptions {
  setConfig: Dispatch<SetStateAction<IConfig>>;
  onComplete: Function;
  config: IConfig;
}

const GameOptions = ({ setConfig, onComplete, config }: IGameOptions) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };
  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col items-center gap-4 bg-slate-50 shadow-lg rounded-lg p-4 max-w-3xl'
    >
      <RadioField
        options={GAMEFORMAT_OPTIONS}
        name='gameFormat'
        onChange={(e: ChangeEvent, key: string, value: string) => {
          setConfig((prev) => ({ ...prev, [key]: value }));
        }}
      />
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
      <Button className='w-full' type='submit' text='Next' />
    </form>
  );
};

export default GameOptions;
