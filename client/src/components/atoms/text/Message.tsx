export interface MessageProps extends React.ComponentProps<'p'> {
  message: string;
  icon: React.ReactNode;
  className?: string;
}

const Message = ({ message, icon, className, ...props }: MessageProps): JSX.Element => {
  return (
    <p
      className={`${className} flex gap-4 p-4 text-slate-700 rounded-lg even:bg-slate-100`}
      {...props}
    >
      {icon}
      {message}
    </p>
  );
};

export { Message };
