export interface MessageProps extends React.ComponentProps<'p'> {
  children: React.ReactNode;
}

const Message = ({ children, ...props }: MessageProps): JSX.Element => {
  return (
    <p className='p-4 rounded-lg even:bg-slate-200 ' {...props}>
      {children}
    </p>
  );
};

export { Message };
