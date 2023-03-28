import { useReducer, useState, useEffect } from 'react';
import { TURN_DELAY } from '@data/constants';
import { useShips } from './useShips';
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
  BoardEnum,
  GameEnum,
  ShipsEnum,
} from './models/_index';
import { useBoard } from './useBoard';

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

const useGame = ({ x, y }: Coordinate) => {
  const [playerShips, setPlayerShips] = useShips();
  const [playerBoard, setPlayerBoard] = useBoard({ x, y });
  const [opponentShips, setOpponentShips] = useShips();
  const [opponentBoard, setOpponentBoard] = useBoard({ x, y });
  const [isWin, setIsWin] = useState<string | null>(null);
  const [messages, setMessages] = useState<Messages>([]);
  const [game, setGame] = useReducer(reducer, {
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
      player: {
        board: [...playerBoard],
        ships: [...playerShips],
      },
      opponent: {
        board: [...opponentBoard],
        ships: [...opponentShips],
      },
      moves: [],
    },
  });

  // Listens to game does not have any more selectable tiles
  const listenForWin = () => {
    useEffect(() => {
      if (isBoardLose(playerBoard)) {
        setIsWin('opponent');
      }
      if (isBoardLose(opponentBoard)) {
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
        setGame({
          type: GameEnum.PLAYER_ATTACK,
          payload: { coords: { x, y } },
        });
      switchTurn = () => {
        setGame({ type: GameEnum.OPPONENT_TURN, payload: null });
      };
      hitOrMiss = isTilePlaced(opponentBoard, { x, y });
      ship = findShipWithCoords(opponentShips, { x, y });
    }

    // Else, (if opponent), set methods for opponent's turn
    if (type === PlayerEnum.OPPONENT) {
      attack = () => {
        setGame({
          type: GameEnum.OPPONENT_ATTACK,
          payload: { coords: { x, y } },
        });
        switchTurn = () => {
          setGame({
            type: GameEnum.PLAYER_TURN,
            payload: null,
          });
        };
      };
      hitOrMiss = isTilePlaced(playerBoard, { x, y });
      ship = findShipWithCoords(playerShips, { x, y });
    }

    // Attack, then disable the board to prevent user from clicking more than once
    attack();
    setGame({ type: GameEnum.DISABLE_BOARD, payload: null });

    // Set Messages based on previous requirements
    const messages = createMessages(type, hitOrMiss, ship, {
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
      return game.player.isHide ? hideShips(playerBoard) : playerBoard;
    }
    return game.opponent.isHide ? hideShips(opponentBoard) : opponentBoard;
  };

  return {
    game,
    player: {
      setShips: setPlayerShips,
      setBoard: setPlayerBoard,
      ships: playerShips,
      board: playerBoard,
    },
    opponent: {
      setShips: setOpponentShips,
      setBoard: setOpponentBoard,
      ships: opponentShips,
      board: opponentBoard,
    },
    isWin,
    messages,
    playerTurn,
    listenForWin,
    setGame,
    hideBoard,
    setMessages,
  };
};

export { useGame };
