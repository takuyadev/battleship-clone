import axios from 'axios';
import { useReducer, useState, useEffect } from 'react';
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
  generatePossibleMoves,
  isShipInBoard,
  updateShipOnBoard,
  generateBoard,
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
import { placeShipRandomly } from '@utils/ai/placeShipsRandomly';

// Default game configuration
const GAME_FORM: Config = {
  gameFormat: GameFormat.LOCAL,
  boardSize: BoardSize.XL,
};

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
    case GameEnum.UPDATE_PLAYER_NAME:
      state.player.name = payload.name;
      return { ...state };

    case GameEnum.UPDATE_OPPONENT_NAME:
      state.opponent.name = payload.name;
      return { ...state };

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

    case GameEnum.SHOW_BOARDS:
      state.opponent.isHide = false;
      state.player.isHide = false;
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

const useGame = ({ x, y }: Coordinate) => {
  // Player and opponent settings for board and ship location
  const [playerShips, setPlayerShips] = useShips();
  const [playerBoard, setPlayerBoard] = useBoard({ x, y });
  const [opponentShips, setOpponentShips] = useShips();
  const [opponentBoard, setOpponentBoard] = useBoard({ x, y });
  const [turnCount, setTurnCount] = useState(0);

  // State for checking which tiles the computer has already hit
  const [computerMoves, setComputerMoves] = useState<Coordinates>(
    generatePossibleMoves(GAME_FORM.boardSize)
  );

  // Set state for timer, or loading for other opponent to move
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(TurnDelay.SWITCH);

  // Set configurations for the game
  const [config, setConfig] = useState(GAME_FORM);

  // State for determining win or loss
  const [isWin, setIsWin] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Log message list
  const [messages, setMessages] = useState<Messages>([]);

  // useReducer hook for final export
  const [game, setGame] = useReducer(reducer, {
    player: {
      name: 'Player 1',
      board: playerBoard,
      ships: playerShips,
      setShips: setPlayerShips,
      setBoard: setPlayerBoard,
      isTurn: true,
      isHide: false,
    },
    opponent: {
      name: 'Player 2',
      board: opponentBoard,
      ships: opponentShips,
      setShips: setOpponentShips,
      setBoard: setOpponentBoard,
      isTurn: false,
      isHide: true,
    },
    replay: {
      boardSize: GAME_FORM.boardSize,
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

  // Sets up for updaing current name when game starts
  useEffect(() => {
    setCurrentName(game.opponent.name);
  }, [game.opponent.name]);

  // If any configurations changes, then should set to new configuration
  useEffect(() => {
    game.player.setBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    game.opponent.setBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    game.player.setShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    game.opponent.setShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });
    setMessages([]);
    setTurnCount(0);
    setComputerMoves(generatePossibleMoves(config.boardSize));
    setGame({ type: GameEnum.PLAYER_TURN, payload: null });
    setIsWin(false);
    setLoading(true);
    setGameOver(false);
    setGame({
      type: GameEnum.UPDATE_PLAYER_NAME,
      payload: {
        name: 'Player 1',
        coords: { x: 0, y: 0 },
      },
    });
    setGame({
      type: GameEnum.UPDATE_OPPONENT_NAME,
      payload: {
        name: 'Player 2',
        coords: { x: 0, y: 0 },
      },
    });
  }, [config]);

  // Listens to game does not have any more selectable tiles
  const listenForWin = () => {
    useEffect(() => {
      if (gameOver) return;

      if (isBoardLose(playerBoard)) {
        setCurrentName(game.opponent.name);
        setIsWin(true);
        setLoading(false);
        updateLeaderboard(game.opponent.name, turnCount);
      }

      if (isBoardLose(opponentBoard)) {
        setCurrentName(game.player.name);
        setIsWin(true);
        setLoading(false);
        updateLeaderboard(game.player.name, turnCount);
      }
    }, [game]);
  };

  useEffect(() => {
    if (gameOver) {
      endGame();
    }
  }, [gameOver]);

  // Show board at the end of the game
  const endGame = () => {
    setGameOver(true);
    setLoading(false);
    setIsWin(false);
    setGame({ type: GameEnum.DISABLE_BOARD, payload: null });
    setGame({ type: GameEnum.SHOW_BOARDS, payload: null });
  };

  // Action to occur when selected player attacks
  const playerTurn = (type: PlayerEnum, { x, y }: Coordinate) => {
    let attack = () => {};
    let switchTurn = () => {};
    let hitOrMiss: boolean = false;
    let ship: Ship | null = null;
    let username = '';

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
      username = game.player.name;
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
      username = game.opponent.name;
    }

    // Attack, then disable the board to prevent user from clicking more than once
    attack();
    setGame({ type: GameEnum.DISABLE_BOARD, payload: null });

    // Set Messages based on previous requirements
    const messages = createMessages(type, username, hitOrMiss, ship, { x, y });
    setMessages((prev) => [...messages, ...prev]);
    setTurnCount((prev) => prev + 1);

    // Wait before before allowing opponent to attack
    setTimeout(() => {
      switchTurn();

      // ? Explanation of Magic #
      // Additional time that is added to:
      // 1. Prevent countdown from immediately ending at 5 seconds (give buffer, better UX) + 1000ms
      // 2. Allow user to see their hit on the board before giving the other person turn + 3000ms
    }, TurnDelay.SWITCH + TurnDelay.HIT + TurnDelay.BUFFER);
  };

  // LOCAL PLAY METHODS
  // Start and show timer component
  const startTimer = () => {
    setLoading(true);
    setSeconds(TurnDelay.SWITCH);
  };

  // When opponent attacks player, run this method
  const opponentAttack = ({ x, y }: Coordinate) => {
    playerTurn(PlayerEnum.OPPONENT, { x, y });
    setCurrentName(game.opponent.name);
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, TurnDelay.HIT);
  };

  // When player attacks opponent, run this method
  const playerAttack = ({ x, y }: Coordinate) => {
    playerTurn(PlayerEnum.PLAYER, { x, y });
    setCurrentName(game.player.name);
    setTimeout(() => {
      setGame({ type: GameEnum.HIDE_BOARDS, payload: null });
      startTimer();
    }, TurnDelay.HIT);
  };

  // COMPUTER PLAY METHODS
  const attackAgainstComputer = ({ x, y }: Coordinate) => {
    setGame({ type: GameEnum.PLAYER_ATTACK, payload: { coords: { x, y } } });
    setGame({ type: GameEnum.DISABLE_BOARD, payload: null });

    const hitOrMiss = isTilePlaced(opponentBoard, { x, y });
    const ship = findShipWithCoords(opponentShips, { x, y });
    const messages = createMessages(
      PlayerEnum.PLAYER,
      game.player.name,
      hitOrMiss,
      ship,
      { x, y }
    );
    setMessages((prev) => [...messages, ...prev]);
    setTurnCount((prev) => prev + 1);
    setTimeout(() => {
      // Activate computer attack after timeout
      computerAttack();
      setGame({ type: GameEnum.PLAYER_TURN, payload: null });
    }, TurnDelay.HIT);
  };

  // Computer methods
  const computerAttack = () => {
    if (gameOver) return;
    // Select move based on all moves available
    const selectedMove = selectMove(computerMoves);
    const hitOrMiss = isTilePlaced(playerBoard, selectedMove);
    const ship = findShipWithCoords(playerShips, selectedMove);
    setTurnCount((prev) => prev + 1);

    setGame({
      type: GameEnum.OPPONENT_ATTACK,
      payload: { coords: selectedMove },
    });

    // Add new messages to list based on hit
    setComputerMoves(filterCoordinates(computerMoves, selectedMove));
    const messages = createMessages(
      PlayerEnum.OPPONENT,
      game.opponent.name,
      hitOrMiss,
      ship,
      selectedMove
    );
    setMessages((prev) => [...messages, ...prev]);
  };

  const computerPlaceShips = () => {
    // To prevent rerenders from messing the board, restart board on call
    game.opponent.setBoard({
      type: BoardEnum.INITIALIZE_BOARD,
      payload: { boardSize: config.boardSize },
    });
    game.opponent.setShips({
      type: ShipsEnum.INITIALIZE_SHIPS,
      payload: null,
    });

    // Generate dummy board to avoid state mismatch
    let newBoard = generateBoard(config.boardSize, config.boardSize);

    // Loop through ships until all ships are placed
    for (const ship of game.opponent.ships) {
      let isPlaced = false;

      // Try placing the ship randomly until a valid position is found
      while (!isPlaced) {
        const isRotated = Math.random() > 0.5;
        const coords = placeShipRandomly(isRotated, config.boardSize, ship);
        const isShipInBoardResult = isShipInBoard(newBoard, coords, {
          height: ship.height,
          isRotated,
        });

        // If the ship can be placed at these coordinates, save them and exit loop
        if (isShipInBoardResult) {
          setOpponentShips({
            type: ShipsEnum.UPDATE_PLACED,
            payload: { id: ship.id },
          });

          setOpponentBoard({
            type: BoardEnum.ADD_SHIP,
            payload: {
              coords,
              options: { height: ship.height, isRotated },
            },
          });

          setOpponentShips({
            type: ShipsEnum.ROTATE_SHIP,
            payload: { id: ship.id, isRotated },
          });

          setOpponentShips({
            type: ShipsEnum.UPDATE_COORDINATES,
            payload: {
              coords,
              id: ship.id,
            },
          });

          // Update dummyboard with new data
          newBoard = updateShipOnBoard(newBoard, coords, {
            isRotated,
            height: ship.height,
          });

          // successfully placed
          isPlaced = true;
        }
      }
    }
  };

  // Updates leaderboard on call
  const updateLeaderboard = async (username: string, turnCount: number) => {
    await axios.post('http://localhost:8080/leaderboard', {
      turnCount,
      username,
    });
  };

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
      name: game.opponent.name,
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
    turnCount,
    playerTurn,
    computerAttack,
    setGameOver,
    listenForWin,
    setGame,
    endGame,
    setIsWin,
    setConfig,
    setLoading,
    hideBoard,
    setMessages,
    setSeconds,
    attackAgainstComputer,
    computerPlaceShips,
    playerAttack,
    opponentAttack,
    updateLeaderboard,
  };
};

export { useGame };
