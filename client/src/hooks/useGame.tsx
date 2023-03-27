import { useReducer, useState, useEffect } from 'react';
import { hideShips, isBoardLose } from '@utils/index';
import { TURN_DELAY } from '@data/constants';
import { GameState, GameAction, GameParameter, BoardEnum, GameEnum, ShipsEnum } from './models/_index';
import { Coordinate, Board } from '@models/types.common';

// This hook depends on useBoard and useShip hook; but allows for the reuse of game logic across multiple pages, including settimeout functions.
const reducer = (state: GameState, { type, payload }: GameAction) => {
  let x = 0;
  let y = 0;

  if (payload) {
    x = payload.coords.x;
    y = payload.coords.y;
  }

  switch (type) {
    case GameEnum.PLAYER_ATTACK:
      state.opponent.setBoard({
        type: BoardEnum.ATTACK_TILE,
        payload: { coords: { x, y } },
      });

      state.opponent.setShips({
        type: ShipsEnum.UPDATE_HITCOUNT,
        payload: { coords: { x, y } },
      });

      state.replay.moves.push({ x, y });

      return state;

    case GameEnum.OPPONENT_ATTACK:
      state.player.setBoard({
        type: BoardEnum.ATTACK_TILE,
        payload: { coords: { x, y } },
      });

      state.player.setShips({
        type: ShipsEnum.UPDATE_HITCOUNT,
        payload: { coords: { x, y } },
      });

      // Need to spread state in order to initiate rerender
      return { ...state };

    case 'disable-board':
      state.opponent.isTurn = true;
      state.player.isTurn = true;
      return { ...state };

    case 'player-turn':
      state.opponent.isTurn = false;
      state.opponent.isHide = true;
      state.player.isTurn = true;
      state.player.isHide = false;
      return { ...state };

    case 'opponent-turn':
      state.player.isTurn = false;
      state.player.isHide = true;
      state.opponent.isTurn = true;
      state.opponent.isHide = false;
      return { ...state };

    default:
      return state;
  }
};

const useGame = ({ player, opponent }: GameParameter) => {
  const [isWin, setIsWin] = useState<string | null>(null);
  const [game, dispatch] = useReducer(reducer, {
    player: {
      setShips: player.setShips,
      setBoard: player.setBoard,
      isTurn: true,
      isHide: false,
    },
    opponent: {
      setShips: opponent.setShips,
      setBoard: opponent.setBoard,
      isTurn: false,
      isHide: true,
    },
    replay: {
      player: {
        board: [...player.board],
        ships: [...player.ships],
      },
      opponent: {
        board: [...opponent.board],
        ships: [...opponent.ships],
      },
      moves: [],
    },
  });

  // Listens to game does not have any more selectable tiles
  const listenForWin = () => {
    useEffect(() => {
      if (isBoardLose(player.board)) {
        setIsWin('opponent');
      }
      if (isBoardLose(opponent.board)) {
        setIsWin('player');
      }
    }, [game]);
  };

  // Action to occur when  player attacks
  const playerTurn = ({ x, y }: Coordinate) => {
    dispatch({ type: GameEnum.PLAYER_ATTACK, payload: { coords: { x, y } } });
    dispatch({ type: GameEnum.DISABLE_BOARD, payload: null });

    // Wait before before allowing opponent to attack
    setTimeout(() => {
      dispatch({ type: GameEnum.OPPONENT_TURN, payload: null });
    }, TURN_DELAY + 1000);
  };

  // Action to occur when opponent attaaks
  const opponentTurn = ({ x, y }: Coordinate) => {
    dispatch({ type: GameEnum.OPPONENT_ATTACK, payload: { coords: { x, y } } });
    dispatch({ type: GameEnum.DISABLE_BOARD, payload: null });

    // Wait before before allowing player to attack
    setTimeout(() => {
      dispatch({ type: GameEnum.PLAYER_TURN, payload: null });
    }, TURN_DELAY + 1000);
  };

  // Condition to hide board from player
  const hideBoard = (name: 'opponent' | 'player'): Board => {
    if (name === 'player') {
      return game.player.isHide ? hideShips(player.board) : player.board;
    }
    return game.opponent.isHide ? hideShips(opponent.board) : opponent.board;
  };

  return {
    game,
    isWin,
    dispatch,
    hideBoard,
    playerTurn,
    opponentTurn,
    listenForWin,
  };
};

export { useGame };
