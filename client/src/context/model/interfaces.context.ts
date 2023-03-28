import { Dispatch, ReducerAction, ReducerState, SetStateAction } from 'react';
import { Config, Messages, Player } from '@models/types.common';
import { PlayerOptions } from './types.context';
import { GameAction, GameState } from '@hooks/models/_index';
import { PlayerEnum } from '@models/enum.common';

// Game Context Interface
export interface GameContextInterface {
  game: GameState;
  config: Config;
  player: PlayerOptions;
  opponent: PlayerOptions;
  isWin: string | null
  messages: Messages,
  playerTurn: Function,
  hideBoard: Function,
  listenForWin: Function,
  setMessages: Dispatch<SetStateAction<Messages>>
  setConfig: Dispatch<SetStateAction<Config>>;
  setGame: Dispatch<GameAction>;
}
