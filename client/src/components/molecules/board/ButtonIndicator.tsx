import { ComponentProps } from 'react';
import Button from '@components/atoms/buttons/Button';

export interface ButtonIndicatorProps extends ComponentProps<'button'> {
  isPlaced: boolean;
  text?: string;
  icon?: React.ReactNode;
}

const ButtonIndicator = ({
  isPlaced,
  text,
  icon,
  ...props
}: ButtonIndicatorProps) => {

  // Update class based on color indicator
  const indicatorColor = isPlaced ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className='flex flex-col items-center'>
      <div className={`${indicatorColor} duration-200 w-2 h-2 rounded-full`} />
      <Button text={text ? text : ''} icon={icon && icon} {...props} />
    </div>
  );
};

export default ButtonIndicator;
