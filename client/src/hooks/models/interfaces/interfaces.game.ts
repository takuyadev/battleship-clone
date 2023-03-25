// Interfaces for useGame.tsx
import { Replay } from '@models/interfaces.common';
import { Player } from '@models/types.common';
import { PlayerGameState } from '../types/types.game';

export interface GameParameter {
  player: Player;
  opponent: Player;
}

export interface GameState {
  player: PlayerGameState;
  opponent: PlayerGameState;
  replay: Replay;
}
