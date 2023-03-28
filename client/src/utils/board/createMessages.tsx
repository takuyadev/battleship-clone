import { PlayerEnum } from '@models/enum.common';
import { Coordinate, Messages, Ship } from '@models/types.common';
import { GiSpikyExplosion, GiSinkingShip, GiWaterSplash } from 'react-icons/gi';
import { ALPHABET } from '@data/constants';

// Creates messages
export const createMessages = (
  type: PlayerEnum,
  hitOrMiss: boolean,
  ship: Ship | null,
  { x, y }: Coordinate
): Messages => {
  let result = [];

  // Choose player number based on type provided "player" | "opponent"
  const username = type === PlayerEnum.PLAYER ? 'Player 1' : 'Player 2';

  // If ship exists andhas been destroyed, add additional sink message to message list
  if (ship) {
    if (ship.hitCount + 1 === ship.height) {
      const message = {
        icon: <GiSinkingShip className='text-rose-500' />,
        message: `${username} has sunk the ${ship.name}!`,
      };
      result.push(message);
    }
  }

  // Choose icon for missing or hitting
  const icon = hitOrMiss ? (
    <GiSpikyExplosion className='text-rose-300' />
  ) : (
    <GiWaterSplash />
  );

  // Always add hit or miss (i guess i never miss huh (if you see this instructor, i thank you for looking this deep into a random util function))
  const message = {
    icon: icon,
    message: `${username} shoots at ${ALPHABET[y]}${x + 1} and is a ${
      hitOrMiss ? 'hit' : 'miss'
    }!`,
  };

  // Push final message
  result.push(message);
  return result;
};
