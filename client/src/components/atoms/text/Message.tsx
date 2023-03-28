export interface MessageProps extends React.ComponentProps<'p'> {
  message: string;
  icon: React.ReactNode;
}

const Message = ({ message, icon, ...props }: MessageProps): JSX.Element => {
  return (
    <p className='p-4 text-slate-700 rounded-lg even:bg-slate-100' {...props}>
      {icon}
      {message}
    </p>
  );
};

export { Message };
