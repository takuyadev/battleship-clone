import { ComponentProps } from 'react';

export interface CardProps extends ComponentProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={`${className} flex gap-2 p-2 bg-indigo-50 rounded-lg`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
