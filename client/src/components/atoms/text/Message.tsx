export interface MessageProps extends React.ComponentProps<'p'> {
  message: string;
  icon: React.ReactNode;
  className?: string;
}

const Message = ({
  message,
  icon,
  className = '',
  ...props
}: MessageProps): JSX.Element => {
  return (
    <p className='flex gap-4 items-center' {...props}>
      {icon}
      {message}
    </p>
  );
};

export { Message };
