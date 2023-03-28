import { useReducer, useState, useEffect } from 'react';
import { TURN_DELAY } from '@data/constants';
import { Coordinate, Board, Messages, PlayerEnum, Ship } from '@models/_index';
import {
  hideShips,
  isBoardLose,
  isTilePlaced,
  findShipWithCoords,
  createMessages,
} from '@utils/_index';
import {
  GameState,
  GameAction,
  GameParameter,
  BoardEnum,
  GameEnum,
  ShipsEnum,
} from './models/_index';

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

    case GameEnum.HIDE_BOARDS:
      state.opponent.isHide = true;
      state.player.isHide = true;
      return { ...state };

    case GameEnum.DISABLE_BOARD:
      state.opponent.isTurn = true;
      state.player.isTurn = true;
      return { ...state };

    case GameEnum.PLAYER_TURN:
      state.opponent.isTurn = false;
      state.opponent.isHide = true;
      state.player.isTurn = true;
      state.player.isHide = false;
      return { ...state };

    case GameEnum.OPPONENT_TURN:
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
  const [messages, setMessages] = useState<Messages>([]);
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

  // Action to occur when selected player attacks
  const playerTurn = (type: PlayerEnum, { x, y }: Coordinate) => {
    let attack = () => {};
    let switchTurn = () => {};
    let hitOrMiss: boolean = false;
    let ship: Ship | null = null;

    // If type is Player, then set methods for player's turn
    if (type === PlayerEnum.PLAYER) {
      attack = () =>
        dispatch({
          type: GameEnum.PLAYER_ATTACK,
          payload: { coords: { x, y } },
        });
      switchTurn = () => {
        dispatch({ type: GameEnum.OPPONENT_TURN, payload: null });
      };
      hitOrMiss = isTilePlaced(opponent.board, { x, y });
      ship = findShipWithCoords(opponent.ships, { x, y });
    }

    // Else, (if opponent), set methods for opponent's turn
    if (type === PlayerEnum.OPPONENT) {
      attack = () => {
        dispatch({
          type: GameEnum.OPPONENT_ATTACK,
          payload: { coords: { x, y } },
        });
        switchTurn = () => {
          dispatch({
            type: GameEnum.PLAYER_TURN,
            payload: null,
          });
        };
      };
      hitOrMiss = isTilePlaced(player.board, { x, y });
      ship = findShipWithCoords(player.ships, { x, y });
    }

    // Attack, then disable the board to prevent user from clicking more than once
    attack();
    dispatch({ type: GameEnum.DISABLE_BOARD, payload: null });

    // Set Messages based on previous requirements
    const messages = createMessages(PlayerEnum.PLAYER, hitOrMiss, ship, {
      x,
      y,
    });
    setMessages((prev) => [...messages, ...prev]);

    // Wait before before allowing opponent to attack
    setTimeout(() => {
      switchTurn();

      // ? Explanation of Magic #
      // Additional time that is added to:
      // 1. Prevent countdown from immediately ending at 5seconds (give buffer, better UX)
      // 2. Allow user to see their hit on the board before giving the other person turn
    }, TURN_DELAY + 4000);
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
    listenForWin,
    messages,
    setMessages,
  };
};

export { useGame };
