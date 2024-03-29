import { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const Button = ({
  onClick,
  text,
  icon,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${className} bg-indigo-500 text-white rounded-lg py-2 px-3 hover:bg-indigo-200 hover:text-indigo-500 m-1 text-sm font-body ease-out duration-200 font-bold hover:scale-[102%] shadow-inner hover:shadow-md disabled:bg-indigo-100 disabled:text-indigo-300 disabled:hover:shadow-none`}
      onClick={onClick}
      {...props}
    >
      {icon && icon}
      {text && text}
    </button>
  );
};

export default Button;
