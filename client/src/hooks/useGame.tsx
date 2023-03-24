import { useReducer, Dispatch } from 'react';
import { IShips, BoardAction, ShipAction } from '@models/interfaces';
import { IBoard, Coordinates } from '@models/types';
import { hideShips } from '@utils/index';
import { GameAction, IGameReducer } from '@models/interfaces';
import { TURN_DELAY } from '@data/constants';

// This hook depends on useBoard and useShip hook; but allows for the reuse of game logic across multiple pages, including settimeout functions.
const reducer = (state: IGameReducer, { type, payload }: GameAction) => {
  let x = 0;
  let y = 0;

  if (payload) {
    x = payload.coords.x;
    y = payload.coords.y;
  }

  switch (type) {
    case 'player-attack':
      state.opponent.setBoard({
        type: 'attack-tile',
        payload: { coords: { x, y } },
      });

      state.opponent.setShips({
        type: 'update-hitcount',
        payload: { coords: { x, y } },
      });

      state.replay.moves.push({ x, y });

      return state;

    case 'opponent-attack':
      state.player.setBoard({
        type: 'attack-tile',
        payload: { coords: { x, y } },
      });

      state.player.setShips({
        type: 'update-hitcount',
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
      console.log('Opponent Turn:', state);
      return { ...state };

    default:
      return state;
  }
};

const useGame = ({
  setPlayerShips,
  setPlayerBoard,
  setOpponentShips,
  setOpponentBoard,
  playerBoard,
  playerShips,
  opponentBoard,
  opponentShips,
}: {
  setPlayerBoard: Dispatch<BoardAction>;
  setPlayerShips: Dispatch<ShipAction>;
  setOpponentBoard: Dispatch<BoardAction>;
  setOpponentShips: Dispatch<ShipAction>;
  playerShips: IShips[];
  playerBoard: IBoard;
  opponentShips: IShips[];
  opponentBoard: IBoard;
}) => {
  const [game, dispatch] = useReducer(reducer, {
    player: {
      setShips: setPlayerShips,
      setBoard: setPlayerBoard,
      isTurn: true,
      isHide: false,
    },
    opponent: {
      setShips: setOpponentShips,
      setBoard: setOpponentBoard,
      isTurn: false,
      isHide: true,
    },

    replay: {
      boards: {
        playerBoard: [...playerBoard],
        playerShips: [...playerShips],
        opponentBoard: [...opponentBoard],
        opponentShips: [...opponentShips],
      },
      moves: [],
    },
  });

  // Action to occur when  player attacks
  const playerTurn = ({ x, y }: Coordinates) => {
    dispatch({ type: 'player-attack', payload: { coords: { x, y } } });
    dispatch({ type: 'disable-board', payload: null });

    setTimeout(() => {
      dispatch({ type: 'opponent-turn', payload: null });
    }, TURN_DELAY);
  };

  // Action to occur when opponent attaaks
  const opponentTurn = ({ x, y }: Coordinates) => {
    dispatch({ type: 'opponent-attack', payload: { coords: { x, y } } });
    dispatch({ type: 'disable-board', payload: null });

    setTimeout(() => {
      dispatch({ type: 'player-turn', payload: null });
    }, TURN_DELAY);
  };

  const hideBoard = (name: 'opponent' | 'player'): IBoard => {
    if (name === 'player') {
      return game.player.isHide ? hideShips(playerBoard) : playerBoard;
    }
    return game.opponent.isHide ? hideShips(opponentBoard) : opponentBoard;
  };

  return { game, hideBoard, playerTurn, opponentTurn, dispatch };
};

export { useGame };
