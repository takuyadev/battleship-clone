import { useReducer } from 'react';
import { LocalBoardActions, ITurn } from '@models/interfaces';

const reducer = (state: ITurn, action: LocalBoardActions) => {
  switch (action.type) {
    case 'player-turn':
      return {
        player: {
          isTurn: true,
          isHide: false,
        },
        opponent: {
          isTurn: false,
          isHide: true,
        },
      };

    case 'player-attack-turn':
      return {
        player: {
          isTurn: false,
          isHide: false,
        },
        opponent: {
          isTurn: false,
          isHide: true,
        },
      };

    case 'opponent-attack-turn':
      return {
        player: {
          isTurn: false,
          isHide: true,
        },
        opponent: {
          isTurn: false,
          isHide: false,
        },
      };

    case 'opponent-turn':
      return {
        player: {
          isTurn: false,
          isHide: true,
        },
        opponent: {
          isTurn: true,
          isHide: false,
        },
      };

    case 'disable-both':
      return {
        player: {
          isTurn: false,
          isHide: true,
        },
        opponent: {
          isTurn: false,
          isHide: true,
        },
      };

    default:
      return state;
  }
};

const useTurn = () => {
  const initialValue: ITurn = {
    player: {
      isTurn: true,
      isHide: false,
    },
    opponent: {
      isTurn: false,
      isHide: true,
    },
  };

  const [turn, dispatch] = useReducer(reducer, initialValue);

  return [turn, dispatch] as const;
};

export { useTurn };
