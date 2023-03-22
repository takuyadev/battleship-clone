import { ComponentProps } from 'react';

interface IButton_Props extends ComponentProps<'button'> {
  icon: React.ReactNode;
  className?: string
}

const IconButton = ({ icon, className, ...props }: IButton_Props) => {
  return (
    <button
      className={`${className} text-indigo-500 duration-200 hover:scale-110`}
      {...props}
    >
      {icon && icon}
    </button>
  );
};
export default IconButton;
