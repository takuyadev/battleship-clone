import { ComponentProps } from 'react';
import Button from '@components/atoms/buttons/Button';

interface IButtonIndicator_Props extends ComponentProps<'button'> {
  isPlaced: boolean;
  text?: string;
  icon?: React.ReactNode;
}

const ButtonIndicator = ({
  isPlaced,
  text,
  icon,
  ...props
}: IButtonIndicator_Props) => {
  return (
    <div className='flex flex-col items-center '>
      <div
        className={`${
          isPlaced
            ? 'bg-green-500 shadow-lg shadow-green-500'
            : 'bg-red-500 shadow-red-500'
        } duration-200 w-2 h-2 rounded-full `}
      />
      <Button  text={text ? text : ''} icon={icon && icon} {...props} />
    </div>
  );
};

export default ButtonIndicator;
