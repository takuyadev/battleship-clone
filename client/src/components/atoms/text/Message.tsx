import { motion } from 'framer-motion';

export interface MessageProps extends React.ComponentProps<'p'> {
  message: string;
  icon: React.ReactNode;
  className?: string;
  key?: number | string;
}

const Message = ({
  message,
  icon,
  className,
  key,
  ...props
}: MessageProps): JSX.Element => {
  return (
    <div
      className={`${className} flex gap-4 p-4 text-slate-700 rounded-lg even:bg-slate-100`}
    >
      <p className='flex gap-4 items-center' {...props}>
        {icon}
        {message}
      </p>
    </div>
  );
};

export { Message };
