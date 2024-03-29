export type PlayerTurnType = 'player-turn';
export type OpponentTurnType = 'opponent-turn';
export type PlayerAttackType = 'player-attack';
export type OpponentAttackType = 'opponent-attack';
export type DisableBoardType = 'disable-board';

export enum GameEnum {
  PLAYER_TURN = 'player-turn',
  OPPONENT_TURN = 'opponent-turn',
  PLAYER_ATTACK = 'player-attack',
  OPPONENT_ATTACK = 'opponent-attack',
  DISABLE_BOARD = 'disable-board',
  HIDE_BOARDS = 'hide-boards',
  SHOW_BOARDS = 'show-boards',
  UPDATE_PLAYER_NAME = 'update-player-name',
  UPDATE_OPPONENT_NAME = 'update-opponent-name',
}
