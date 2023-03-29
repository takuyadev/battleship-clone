import { useReducer, useState, useEffect } from 'react';
import { TURN_DELAY } from '@data/constants';
import { useShips } from './useShips';
import { BoardSize, GameFormat, Config, Coordinates } from '@models/_index';
import { Coordinate, Board, Messages, PlayerEnum, Ship } from '@models/_index';
import {
  hideShips,
  isBoardLose,
  isTilePlaced,
  findShipWithCoords,
  createMessages,
  selectMove,
  generateBoardForAI,
} from '@utils/_index';
import {
  GameState,
  GameAction,
  BoardEnum,
  GameEnum,
  ShipsEnum,
} from './models/_index';
import { useBoard } from './useBoard';
import { filterCoordinates } from '@utils/ai/filterCoordinate';
import { TurnDelay } from '@models/enum.common';

// This hook depends on useBoard and useShip hook; but allows for the reuse of game logic across multiple pages, including settimeout functions.
const reducer = (state: GameState, { type, payload }: GameAction) => {
  let x = 0;
  let y = 0;

  if (payload) {
    x = payload.coords.x;
    y = payload.coords.y;
  }

  switch (type) {
    // Attacks on coordinate provided, no other side effects
    case GameEnum.PLAYER_ATTACK:
      state.opponent.setBoard({
        type: BoardEnum.ATTACK_TILE,
        payload: { coords: { x, y } },
      });

      state.opponent.setShips({
        type: ShipsEnum.UPDATE_HITCOUNT,
        payload: { coords: { x, y } },
      });

      // For every action, push to replay
      state.replay.moves.push({ x, y });
      return { ...state };

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
      state.replay.moves.push({ x, y });
      return { ...state };

    case GameEnum.HIDE_BOARDS:
      state.opponent.isHide = true;
      state.player.isHide = true;
      return { ...state };

    // Disables both sides boards
    case GameEnum.DISABLE_BOARD:
      state.opponent.isTurn = true;
      state.player.isTurn = true;
      return { ...state };

    // Hard sets default settings for player or opponent turn
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

const GAME_FORM: Config = {
  gameFormat: GameFormat.LOCAL,
  boardSize: BoardSize.XL,
};

const useGame = ({ x, y }: Coordinate) => {
  // Player and opponent settings for board and ship location
  const [playerShips, setPlayerShips] = useShips();
  const [playerBoard, setPlayerBoard] = useBoard({ x, y });
  const [opponentShips, setOpponentShips] = useShips();
  const [opponentBoard, setOpponentBoard] = useBoard({ x, y });

  // State for checking which tiles the computer has already hit
  const [computerMoves, setComputerMoves] = useState<Coordinates>(
    generateBoardForAI(GAME_FORM.boardSize)
  );

  // Set state for timer, or loading for other opponent to move
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(TurnDelay.SWITCH);

  // Set configurations for the game
  const [config, setConfig] = useState(GAME_FORM);

  // State for determining win or loss
  const [isWin, setIsWin] = useState<string | null>(null);

  // Log message list
  const [messages, setMessages] = useState<Messages>([]);

  // useReducer hook for final export
  const [game, setGame] = useReducer(reducer, {
    player: {
      name: 'Player 1',
      setShips: setPlayerShips,
      setBoard: setPlayerBoard,
      isTurn: true,
      isHide: false,
    },
    opponent: {
      name: 'Player 2',
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

  // Display state of current user
  const [currentName, setCurrentName] = useState(game.opponent.name);

  // If any configurations changes, then should set to new configuration
  useEffect(() => {
    setPlayerBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    setOpponentBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    setPlayerShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    setOpponentShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    setComputerMoves(generateBoardForAI(config.boardSize));
    setMessages([]);
    setGame({ type: GameEnum.PLAYER_TURN, payload: null });
  }, [config]);

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
    const messages = createMessages(type, hitOrMiss, ship, { x, y });
    setMessages((prev) => [...messages, ...prev]);

    // Wait before before allowing opponent to attack
    setTimeout(() => {
      switchTurn();

      // ? Explanation of Magic #
      // Additional time that is added to:
      // 1. Prevent countdown from immediately ending at 5 seconds (give buffer, better UX) + 1000ms
      // 2. Allow user to see their hit on the board before giving the other person turn + 3000ms
    }, TURN_DELAY + 4000);
  };

  // LOCAL PLAY METHODS
  // Start and show timer component
  const startTimer = () => {
    setLoading(true);
    setSeconds(TURN_DELAY);
  };

  // When opponent attacks player, run this method
  const opponentAttack = ({ x, y }: Coordinate) => {
    playerTurn(PlayerEnum.OPPONENT, { x, y });
    setCurrentName(game.opponent.name);
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  // When player attacks opponent, run this method
  const playerAttack = ({ x, y }: Coordinate) => {
    playerTurn(PlayerEnum.PLAYER, { x, y });
    setCurrentName(game.player.name);
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, 3000);
  };

  // COMPUTER PLAY METHODS
  const attackAgainstComputer = ({ x, y }: Coordinate) => {
    setGame({ type: GameEnum.PLAYER_ATTACK, payload: { coords: { x, y } } });
    setGame({ type: GameEnum.DISABLE_BOARD, payload: null });

    const hitOrMiss = isTilePlaced(opponentBoard, { x, y });
    const ship = findShipWithCoords(opponentShips, { x, y });
    const messages = createMessages(PlayerEnum.PLAYER, hitOrMiss, ship, {
      x,
      y,
    });
    setMessages((prev) => [...messages, ...prev]);
    setTimeout(() => {
      computerTurn();
      setGame({ type: GameEnum.PLAYER_TURN, payload: null });
    }, 3000);
  };

  // Computer methods
  const computerTurn = () => {
    const selectedMove = selectMove(computerMoves);
    const hitOrMiss = isTilePlaced(playerBoard, selectedMove);
    const ship = findShipWithCoords(playerShips, selectedMove);
    setGame({
      type: GameEnum.OPPONENT_ATTACK,
      payload: { coords: selectedMove },
    });

    // Add new messages to list based on hit
    setComputerMoves(filterCoordinates(computerMoves, selectedMove));
    const messages = createMessages(
      PlayerEnum.OPPONENT,
      hitOrMiss,
      ship,
      selectedMove
    );
    setMessages((prev) => [...messages, ...prev]);
  };

  const computerPlaceShips = () => {
    
  }

  // Condition to hide board from player
  const hideBoard = (name: 'opponent' | 'player'): Board => {
    if (name === 'player') {
      return game.player.isHide ? hideShips(playerBoard) : playerBoard;
    }
    return game.opponent.isHide ? hideShips(opponentBoard) : opponentBoard;
  };

  // Return all methods for game logic
  return {
    game,
    player: {
      name: game.player.name,
      setShips: setPlayerShips,
      setBoard: setPlayerBoard,
      ships: playerShips,
      board: playerBoard,
    },
    opponent: {
      name: game.player.name,
      setShips: setOpponentShips,
      setBoard: setOpponentBoard,
      ships: opponentShips,
      board: opponentBoard,
    },
    isWin,
    messages,
    currentName,
    loading,
    seconds,
    config,
    playerTurn,
    computerTurn,
    listenForWin,
    setGame,
    setConfig,
    setLoading,
    hideBoard,
    setMessages,
    setSeconds,
    attackAgainstComputer,
    playerAttack,
    opponentAttack,
  };
};

export { useGame };
