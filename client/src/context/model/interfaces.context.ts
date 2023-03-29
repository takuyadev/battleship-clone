import { Dispatch, EffectCallback, SetStateAction } from 'react';
import { Config, Coordinate, Messages } from '@models/types.common';
import { PlayerOptions } from './types.context';
import { GameAction, GameState } from '@hooks/models/_index';

// Game Context Interface
export interface GameContextInterface {
  game: GameState;
  config: Config;
  player: PlayerOptions;
  currentName: string;
  loading: boolean;
  seconds: number;
  opponent: PlayerOptions;
  isWin: string | null;
  messages: Messages;
  playerTurn: Function;
  hideBoard: Function;
  listenForWin: EffectCallback;
  playerAttack: ({ x, y }: Coordinate) => void;
  opponentAttack: ({ x, y }: Coordinate) => void;
  attackAgainstComputer: ({ x, y }: Coordinate) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMessages: Dispatch<SetStateAction<Messages>>;
  setConfig: Dispatch<SetStateAction<Config>>;
  setGame: Dispatch<GameAction>;
}
