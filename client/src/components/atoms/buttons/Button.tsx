import { ComponentProps, ReactPropTypes } from 'react';

interface IButton_Props extends ComponentProps<'button'> {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const Button = ({ onClick, text, icon, ...props }: IButton_Props) => {
  return (
    <button
      className='bg-indigo-500 text-white rounded-lg py-2 px-3 hover:bg-indigo-200 hover:text-indigo-500 m-1 text-sm font-body ease-out duration-200 font-bold hover:scale-110 shadow-inner hover:shadow-md disabled:bg-red-500'
      onClick={onClick}
      {...props}
    >
      {text && text}
      {icon && icon}
    </button>
  );
};

export default Button;
