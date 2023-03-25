import type { GameParameter, GameState } from './interfaces/interfaces.game';
import type { OnOffAction } from './types/types.onoff';
import type { ShipAction } from './types/types.ships';
import type { PlayerGameState } from './types/types.game';
import type { GameAction } from './types/types.game';
import type { BoardAction } from './types/types.board';
import { BoardEnum } from './enum/enum.board';
import { GameEnum } from './enum/enum.game';
import { OnOffEnum } from './enum/enum.onoff';
import { ShipsEnum } from './enum/enum.ships';

export {
  GameAction,
  GameParameter,
  OnOffAction,
  ShipAction,
  PlayerGameState,
  BoardAction,
  GameState,
  BoardEnum,
  ShipsEnum,
  GameEnum,
  OnOffEnum,
};
