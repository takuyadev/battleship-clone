import { Dispatch, SetStateAction } from 'react';
import { Config } from '@models/types.common';
import { PlayerOptions } from './types.context';

// Game Context Interface
export interface GameContextInterface {
  player: PlayerOptions;
  opponent: PlayerOptions;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}
