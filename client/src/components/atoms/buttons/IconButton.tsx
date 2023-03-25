import { ComponentProps } from 'react';

export interface IconButtonProps extends ComponentProps<'button'> {
  icon: React.ReactNode;
  className?: string;
}

const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
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
